import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).json("Method not allowed.");
        return;
    }
    const { username, stat } = req.query;
    if (!username || !stat) {
        res.status(400).json("Invalid parameters.");
        return;
    }

    const statKey: string = stat.toString();

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const statsCollection = db.collection('stats');

    try {
        const stats = await statsCollection.find({ username }, {projection: { data: { [statKey]: { value: 1 } }, timestamp: 1}}).toArray();
        const statData: number[] = stats.map(stat => stat.data[statKey].value - stats[0].data[statKey].value);
        const statTimestamps: number[] = stats.map(stat => (stat.timestamp - stats[0].timestamp)/(1000*60*60*24));
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