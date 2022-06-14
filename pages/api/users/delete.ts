import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "DELETE") {
        res.status(405).json("Method not allowed.");
        return;
    }
    if(!req.body) {
        res.status(400).json("Invalid parameters.");
        return;
    }
    
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const usersCollection = db.collection('users');

    try {
        const { username } = req.body;
        const user = await usersCollection.findOne({ username });
        if(!user)
            res.status(404).json("User not found.");
        else {
            await usersCollection.deleteOne({ username });
            res.status(202).json({"message": "User deleted successfully."});
        }
    } catch (error) {
        res.status(500).json(error);
    } finally {
        await client.close();
    }
}