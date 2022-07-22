import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { startAnimation } from "framer-motion/types/animation/utils/transitions";

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
        const statData: number[] = stats.map(stat => {
            if (statKey == 'timePlayed') {
                return (stat.data[statKey].value / 3600).toFixed(2);
            } else {
                return stat.data[statKey].value
            }
        });
        const statTimestamps: number[] = stats.map(stat => (stat.timestamp - stats[0].timestamp)/(DAY_IN_MS));
        if (!stats)
            res.status(404).json("Stats not found.");
        else
            res.status(200).json({ statData, statTimestamps });
    } catch (error) {
        res.status(500).json(error);
    } finally {
        await client.close();
    }
}