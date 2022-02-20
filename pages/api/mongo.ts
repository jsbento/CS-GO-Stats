import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(!req.body)
        res.status(400).json("Invalid parameters.");
    else {
        const client = await MongoClient.connect(process.env.MONGODB_URI!);
        const db = client.db();
        const statsCollection = db.collection("stats");
        if(req.method === "POST") {
            console.log(JSON.parse(req.body));
            
            const result = await statsCollection.insertOne(JSON.parse(req.body));
            console.log(result);
            res.status(201).json("Data inserted successfully.");
        }
        else if(req.method === "GET") {
            const { username, data } = JSON.parse(req.body);
            const result = statsCollection.find({username: username});
            console.log(result);
            res.status(200).json(result);
        }
        else {
            res.status(405).json("Method not allowed.");
        }
        client.close();
    }
}