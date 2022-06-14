import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "DELETE") {
        res.status(405).json("Method not allowed.");
        return;
    }

    const { username } = req.body;
    if (!username) {
        res.status(400).json("Invalid parameters.");
        return;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const statsCollection = db.collection('stats');

    try {
        await statsCollection.deleteMany({ username });
        res.status(202).json({"message": "Stats deleted successfully."});
    } catch (error) {
        res.status(500).json(error);
    } finally {
        await client.close();
    }
}