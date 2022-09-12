import { StatFilters } from "./Stats"

export type PlotData = {
    statData: number[],
    statTimestamps: number[],
    bestFit: number[]
}

export type StatPlotProps = {
    stat: string,
    title: string,
    filters: StatFilters
}

export type CompositePlotProps = {
    statA: string,
    statB: string,
    title: string
}