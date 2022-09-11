import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).json({ message: "Method not allowed." });
        return;
    }

    const username = JSON.parse(req.cookies.info).user;
    if (!username) {
        res.status(401).json({ message: "Unauthorized." });
        return;
    }

    const { statA, statB } = req.query;
    if (!statA || !statB) {
        res.status(400).json({ message: "Invalid parameters." });
        return;
    }

    const statAKey: string = statA.toString();
    const statBKey: string = statB.toString();

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const usersCollection = db.collection('stats');

    try {
        const start = Date.now();
        const end = start - 30 * DAY_IN_MS;
        const stats = await usersCollection.find(
            {
                username
            },
            {
                projection: {
                    data: {
                        [statAKey]: { value: 1 },
                        [statBKey]: { value: 1 }
                    },
                },
            }
        ).toArray();
        if (!stats)
            res.status(404).json({ message: "Stats not found." });
        else {
            const statAData: number[] = stats.map(stat => {
                if (statAKey == 'timePlayed') {
                    return (stat.data[statAKey].value / 3600);
                } else {
                    return stat.data[statAKey].value
                }
            });
            const statBData: number[] = stats.map(stat => {
                if (statBKey == 'timePlayed') {
                    return (stat.data[statBKey].value / 3600);
                } else {
                    return stat.data[statBKey].value
                }
            });
            res.status(200).json({ statAData, statBData });
        }
    } catch(error) {
        res.status(500).json(error);
    } finally {
        await client.close();
    }
}