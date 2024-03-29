import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed." });
        return;
    }
    const { username, stats, timestamp } = req.body;
    if (!username || !stats || !timestamp) {
        res.status(400).json({ message: "Invalid parameters." });
        return;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const statsCollection = db.collection('stats');

    try {
        const result = await statsCollection.insertOne({ username, data: stats, timestamp });
        res.status(201).json({ message: "Stats saved successfully.", insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        await client.close();
    }
}