import React, { useState, useEffect } from "react";
import StatsCard from "../cards/StatsCard";
import { ServerDataResponse } from "../../types/Data";
import Cookies from "js-cookie";
import useSWR from "swr";
import { ButtonBarProps } from "../../types/Components";
import ButtonBar from "../ButtonBar";

interface StatCardsProps {
    page: number;
}

const fetcher = async (input: RequestInfo, init: RequestInit) => await fetch(input, init).then(res => res.json());

const StatCards: React.FC<StatCardsProps> = ({ page }) => {
    const [currPage, setCurrPage] = useState<number>(page);

    useEffect(() => {
        Cookies.set("page", currPage.toString(), { expires: 1/24 });
    }, [currPage]);
    
    const { data, error } = useSWR<ServerDataResponse>(
        `/api/statistics/get_all?page=${currPage}`,
        fetcher,
    );

    if (error) return <div>Failed to load data</div>;
    if (!data) return <div>Loading...</div>;

    const onPageChange = (dir: string) => {
        if (dir === "prev") {
            if (data.info.prev)
                setCurrPage(currPage - 1);
        } else if (dir === "next") {
            if (data.info.next)
                setCurrPage(currPage + 1);
        } else if (dir === "first") {
            setCurrPage(1);
        } else if (dir === "last") {
            setCurrPage(data.info.pages);
        }
    };

    const buttonBarProps: ButtonBarProps = {
        page: currPage,
        pages: data.info.pages,
        onPageChange,
    }


    return (
        <>
            <ButtonBar {...buttonBarProps} />
            <ul className="grid gap-3 grid-cols-4">
                {data.stats.map((stat, i) => ( <StatsCard key={i} {...stat} /> ))}
            </ul>
            <ButtonBar {...buttonBarProps} />
        </>
    );
}

export default StatCards;