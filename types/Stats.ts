import { ServerData } from "./Data";

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

type StatNames = {
    [key: string]: string
}

export const StatNames: StatNames = {
    timePlayed: "Time Played",
    score: "Score",
    kills: "Kills",
    deaths: "Deaths",
    kd: "K/D",
    damage: "Damage",
    headshots: "Headshots",
    shotsFired: "Shots Fired",
    shotsHit: "Shots Hit",
    accuracy: "Accuracy",
    bombsPlanted: "Bombs Planted",
    bombsDefused: "Bombs Defused",
    hostagesRescued: "Hostages Rescued",
    mvps: "MVPs",
    matchesPlayed: "Matches Played",
    wins: "Wins",
    losses: "Losses",
    winLoss: "Win/Loss",
    headshotPct: "Headshot %"
}

export interface StatCardsProps {
    data: ServerData[]
}