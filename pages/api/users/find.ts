import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).json("Method not allowed.");
        return;
    }
    
    const { username } = req.query;
    if(!username) {
        res.status(400).json("Invalid parameters.");
        return;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const usersCollection = db.collection('users');

    try {
        const user = await usersCollection.findOne({ username });
        if (!user)
            res.status(404).json("User not found.");
        else
            res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    } finally {
        await client.close();
    }
}