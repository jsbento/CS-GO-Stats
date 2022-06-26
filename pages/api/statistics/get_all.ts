import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { DataInfo, ServerData, ServerDataResponse } from "../../../types/Data";

const RESULTS_PER_PAGE = 4;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).json("Method not allowed.");
        return;
    }

    let sendAll = true;
    if (req.query.page) {
        sendAll = false;
    }

    const cookie = JSON.parse(req.cookies.info);
    if(!cookie || !cookie.user || !cookie.token) {
        res.status(401).json("Unauthorized.");
        return;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const statsCollection = db.collection<ServerData>('stats');

    const page = parseInt(req.query.page as string);

    try {
        const stats = (await statsCollection.find({ username: cookie.user }).toArray()).reverse();
        const dataInfo: DataInfo = {
            count: stats.length,
            pages: Math.ceil(stats.length / RESULTS_PER_PAGE),
            next: page !== Math.ceil(stats.length / RESULTS_PER_PAGE) ? `/api/statistics/get_all?page=${page + 1}` : null,
            prev: page > 1 ? `/api/statistics/get_all?page=${page - 1}` : null
        };

        if (!stats)
            res.status(404).json("Stats not found.");
        else {
            const start = (page - 1) * RESULTS_PER_PAGE;
            const end = start + RESULTS_PER_PAGE;
            const response: ServerDataResponse = {
                info: dataInfo,
                stats: sendAll ? stats : stats.slice(start, end)
            };
            res.status(200).json({info: dataInfo, stats: sendAll ? stats : stats.slice(start, end)});
        }
    } catch (error) {
        res.status(500).json(error);
    } finally {
        await client.close();
    }
}