import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === "POST" && !req.body)
        res.status(400).json("Invalid parameters.");
    else {
        const client = await MongoClient.connect(process.env.MONGODB_URI!);
        const db = client.db();
        const statsCollection = db.collection("stats");
        if(req.method === "POST") {
            await statsCollection.insertOne(JSON.parse(req.body));
            res.status(201).json("Data inserted successfully.");
        }
        else if(req.method === "GET") {
            const {username} = req.query;
            const result = statsCollection.find({"username": username});
            const docs = await result.toArray();
            res.status(200).json(docs);
        }
        else if(req.method === "DELETE") {
            const {username} = req.query;
            await statsCollection.deleteMany({username: username});
            res.status(202);
        }
        else {
            res.status(405).json("Method not allowed.");
        }
        client.close();
    }
}