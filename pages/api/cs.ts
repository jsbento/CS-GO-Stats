import { NextApiRequest, NextApiResponse } from "next";
require('dotenv').config();

export type Stats = {
    timePlayed?: {value: number, percentile: number},
    score?: {value: number, percentile: number},
    kills?: {value: number, percentile: number},
    deaths?: {value: number, percentile: number},
    kd?: {value: number, percentile: number},
    damage?: {value: number, percentile: number},
    headshots?: {value: number, percentile: number},
    shotsFired?: {value: number, percentile: number},
    shotsHit?: {value: number, percentile: number},
    accuracy?: {value: number, percentile: number},
    bombsPlanted?: {value: number, percentile: number},
    bombsDefused?: {value: number, percentile: number},
    hostagesRescued?: {value: number, percentile: number},
    mvps?: {value: number, percentile: number},
    matchesPlayed?: {value: number, percentile: number},
    wins?: {value: number, percentile: number},
    losses?: {value: number, percentile: number},
    winLoss?: {value: number, percentile: number},
    headshotPct?: {value: number, percentile: number}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Stats | string>) {
    if(!req.body)
        res.status(400).json("Invalid parameters.");
    try {
        const { username } = JSON.parse(req.body);
        const raw_stats = await fetch(`https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${username}`, {
            method: 'GET',
            headers: {
                'TRN-Api-Key': process.env.TRN_API_KEY!
            }
        })
        .then(response => {return response.json();})
        .then(data => {return data.data.segments[0].stats;})
        
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

        res.status(200).json(stats);
    }
    catch(error) {
        res.status(500).json("Internal server error, check username.");
    }
}