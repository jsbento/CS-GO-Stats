import { Collection, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(!req.body)
        res.status(400).json("Invalid parameters.");
    else {
        const client = await MongoClient.connect(process.env.MONGODB_URI!);
        const db = client.db();
        const statsCollection = db.collection("stats");
        if(req.method === "POST") {
            const result = postData(statsCollection, req.body);
            console.log(result);
            client.close();
            res.status(201).json("Data inserted successfully.");
        }
        else {
            res.status(405).json("Method not allowed.");
        }
    }
}

async function postData(collection:Collection, data:any) {
    return await collection.insertOne(data);
}