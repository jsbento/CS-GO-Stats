import { Stats } from "./Stats";
import { WithId } from "mongodb";

export interface ServerData {
    _id: number | null,
    username: string | null,
    data: Stats,
    timestamp: string | number
}

export interface DataInfo {
    count: number,
    pages: number,
    next: string | null,
    prev: string | null
}

export interface ServerDataResponse {
    info: DataInfo,
    stats: ServerData[] | WithId<Document>[]
}