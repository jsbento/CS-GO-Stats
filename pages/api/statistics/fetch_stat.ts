import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).json("Method not allowed.");
        return;
    }
    const { stat } = req.query;
    if (!stat) {
        res.status(400).json("Invalid parameters.");
        return;
    }

    const username = JSON.parse(req.cookies.info).user;
    if (!username) {
        res.status(401).json("Unauthorized.");
        return;
    }

    const statKey: string = stat.toString();

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const statsCollection = db.collection('stats');

    try {
        const start = Date.now();
        const end = start - 30 * DAY_IN_MS;
        const stats = await statsCollection.find({ username, timestamp: { '$lte': start, '$gte': end } }, {projection: { data: { [statKey]: { value: 1 } }, timestamp: 1}}).toArray();
        if (!stats)
            res.status(404).json("Stats not found.");
        else {
            const statData: number[] = stats.map(stat => {
                if (statKey == 'timePlayed') {
                    return (stat.data[statKey].value / 3600);
                } else {
                    return stat.data[statKey].value
                }
            });
            const statTimestamps: number[] = stats.map(stat => (stat.timestamp - stats[0].timestamp)/(DAY_IN_MS));
            const bestFit = calculateBestFit(statTimestamps, statData);
            res.status(200).json({ statData, statTimestamps, bestFit });
        }
    } catch (error) {
        res.status(500).json(error);
    } finally {
        await client.close();
    }
}

const calculateBestFit = (x: number[], y: number[]): number[] => {
    if (x.length != y.length) {
        throw new Error("Arrays must be of equal length.");
    }

    const x_avg = x.reduce((a, b) => a + b) / x.length;
    const y_avg = y.reduce((a, b) => a + b) / y.length;
    let xx : number[] = [];
    let xy : number[] = [];
    for (let i = 0; i < x.length; i++) {
        xx.push((x[i]-x_avg)**2);
        xy.push((x[i]-x_avg)*(y[i]-y_avg));
    }
    const slope = xy.reduce((a, b) => a + b) / xx.reduce((a, b) => a + b);
    const intercept = y_avg - slope * x_avg;
    const res_Y = x.map(x => slope * x + intercept);
    return res_Y;
}