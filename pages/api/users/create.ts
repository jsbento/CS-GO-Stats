import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST")
        res.status(405).json({ message: "Method not allowed." });
    if (!req.body)
        res.status(400).json({ message: "Invalid parameters." });
    
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const usersCollection = db.collection('users');
    
    try {
        const result = await usersCollection.insertOne(req.body);
        res.status(201).json({message: "User created successfully.", insertedId: result.insertedId});
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        await client.close();
    }
}