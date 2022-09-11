import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { DataInfo } from "../../../types/Data";

const RESULTS_PER_PAGE = 4;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).json({ message: "Method not allowed." });
        return;
    }

    let pageStr:string;
    if (!req.query) {
        pageStr = "1";
    } else {
        let { page } = req.query;
        if (!page)
            pageStr = "1";
        else
            pageStr = page.toString();
    }

    const { info } = req.cookies;
    let cookie;
    if(!info) {
        res.status(401).json({ message: "Unauthorized." });
        return;
    } else {
        cookie = JSON.parse(info);
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const statsCollection = db.collection('stats');

    const pageNum = parseInt(pageStr);

    try {
        const stats = (await statsCollection.find({ username: cookie.user }).toArray()).reverse();
        
        const dataInfo: DataInfo = {
            count: stats.length,
            pages: Math.ceil(stats.length / RESULTS_PER_PAGE),
            next: pageNum !== Math.ceil(stats.length / RESULTS_PER_PAGE) ? `http://localhost:3000/api/statistics/get_all?page=${pageNum + 1}` : null,
            prev: pageNum > 1 ? `http://localhost:3000/api/statistics/get_all?page=${pageNum - 1}` : null
        };

        if (!stats)
            res.status(404).json({ message: "Stats not found." });
        else {
            const start = (pageNum - 1) * RESULTS_PER_PAGE;
            const end = start + RESULTS_PER_PAGE;
            res.status(200).json({info: dataInfo, stats: stats.slice(start, end)});
        }
    } catch (error) {
        res.status(500).json({error});
    } finally {
        await client.close();
    }
}