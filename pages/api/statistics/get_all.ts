import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).json("Method not allowed.");
        return;
    }

    const cookie = JSON.parse(req.cookies.info);
    if(!cookie || !cookie.user || !cookie.token) {
        res.status(401).json("Unauthorized.");
        return;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const statsCollection = db.collection('stats');

    try {
        const stats = await statsCollection.find({ username: cookie.user }).toArray();
        if (!stats)
            res.status(404).json("Stats not found.");
        else
            res.status(200).json(stats);
    } catch (error) {
        res.status(500).json(error);
    } finally {
        await client.close();
    }
}