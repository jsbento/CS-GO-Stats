import { NextApiRequest, NextApiResponse } from "next";
import { Stats } from "../../../types/Stats";

const isAuthorized = async (username: string | string[]) => {
    const { valid } = await fetch(`/api/auth/fetch_token?username=${username}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => data.valid)
    .catch(err => {
        console.log(err);
        return false;
    });
    return valid;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).json("Method not allowed.");
        return;
    }

    const { username } = req.query;
    if (!username) {
        res.status(400).json("Invalid parameters.");
        return;
    }

    try {
        const raw_stats = await fetch(`https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${username}`, {
            method: "GET",
            headers: {
                "TRN-Api-Key": process.env.TRN_API_KEY!
            }
        })
        .then(response => response.json())
        .then (data => data.data.segments[0].stats);

        const stats: Stats = {
            timePlayed: {value: raw_stats.timePlayed.value, percentile: raw_stats.timePlayed.percentile},
            score: {value: raw_stats.score.value, percentile: raw_stats.score.percentile},
            kills: {value: raw_stats.kills.value, percentile: raw_stats.kills.percentile},
            deaths: {value: raw_stats.deaths.value, percentile: raw_stats.deaths.percentile},
            kd: {value: raw_stats.kd.value, percentile: raw_stats.kd.percentile},
            damage: {value: raw_stats.damage.value, percentile: raw_stats.damage.percentile},
            headshots: {value: raw_stats.headshots.value, percentile: raw_stats.headshots.percentile},
            shotsFired: {value: raw_stats.shotsFired.value, percentile: raw_stats.shotsFired.percentile},
            shotsHit: {value: raw_stats.shotsHit.value, percentile: raw_stats.shotsHit.percentile},
            accuracy: {value: raw_stats.shotsAccuracy.value, percentile: raw_stats.shotsAccuracy.percentile},
            bombsPlanted: {value: raw_stats.bombsPlanted.value, percentile: raw_stats.bombsPlanted.percentile},
            bombsDefused: {value: raw_stats.bombsDefused.value, percentile: raw_stats.bombsDefused.percentile},
            hostagesRescued: {value: raw_stats.hostagesRescued.value, percentile: raw_stats.hostagesRescued.percentile},
            mvps: {value: raw_stats.mvp.value, percentile: raw_stats.mvp.percentile},
            matchesPlayed: {value: raw_stats.matchesPlayed.value, percentile: raw_stats.matchesPlayed.percentile},
            wins: {value: raw_stats.wins.value, percentile: raw_stats.wins.percentile},
            losses: {value: raw_stats.losses.value, percentile: raw_stats.losses.percentile},
            winLoss: {value: raw_stats.wlPercentage.value, percentile: raw_stats.wlPercentage.percentile},
            headshotPct: {value: raw_stats.headshotPct.value, percentile: raw_stats.headshotPct.percentile}
        }

        if (await isAuthorized(username)) {
            await fetch('/api/stats/save', {
                method: 'POST',
                body: JSON.stringify({ username, stats, timestamp: Date.now() })
            })
            .then(response => {
                if (response.status === 200)
                    res.status(200).json({stats, message: "Stats saved."});
                else
                    res.status(500).json({stats, message: "Error saving stats."});
            })
        } else {
            res.status(403).json({stats, message: "You are not authorized to save stats."});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}