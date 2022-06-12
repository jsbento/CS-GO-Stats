import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { User } from "../../../types/User";
require("dotenv").config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST")
        res.status(405).json("Method not allowed.");
    if (!req.body)
        res.status(400).json("Invalid parameters.");
    
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db('cs-stats');
    const usersCollection = db.collection('users');
    
    try {
        const user: User = JSON.parse(req.body);
        const result = await usersCollection.insertOne(user);
        res.status(201).json({"message": "User created successfully.", "insertedId": result.insertedId});
    } catch (error) {
        res.status(500).json(error);
    } finally {
        await client.close();
    }
}