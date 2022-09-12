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

export type StatOption = {
    label: string;
    value: string | undefined;
}

export const StatOptions: StatOption[] = [
    { value: "", label: "Select Stat" },
    { value: "timePlayed", label: StatNames.timePlayed },
    { value: "score", label: StatNames.score },
    { value: "kills", label: StatNames.kills },
    { value: "deaths", label: StatNames.deaths },
    { value: "kd", label: StatNames.kd },
    { value: "damage", label: StatNames.damage },
    { value: "headshots", label: StatNames.headshots },
    { value: "shotsFired", label: StatNames.shotsFired },
    { value: "shotsHit", label: StatNames.shotsHit },
    { value: "accuracy", label: StatNames.accuracy },
    { value: "bombsPlanted", label: StatNames.bombsPlanted },
    { value: "bombsDefused", label: StatNames.bombsDefused },
    { value: "hostagesRescued", label: StatNames.hostagesRescued },
    { value: "mvps", label: StatNames.mvps },
    { value: "matchesPlayed", label: StatNames.matchesPlayed },
    { value: "wins", label: StatNames.wins },
    { value: "losses", label: StatNames.losses },
    { value: "winLoss", label: StatNames.winLoss },
    { value: "headshotPct", label: StatNames.headshotPct }
]

export const PullRangeOptions: StatOption[] = [
    { value: "0", label: "All" },
    { value: "30", label: "Last 30 Days" },
    { value: "15", label: "Last 15 Days" },
    { value: "7", label: "Last 7 Days" },
    { value: "1", label: "Last 24 Hours" }
]

export interface StatCardsProps {
    data: ServerData[]
}

export type StatFilters = {
    start: number;
    end: number;
}