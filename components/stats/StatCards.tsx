import React, { useState, useEffect } from "react";
import StatsCard from "../cards/StatsCard";
import { ServerData } from "../../types/Data";

const StatCards: React.FC = () => {
    const [dataArr, setDataArr] = useState<ServerData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`/api/statistics/get_all`, {
                method: "GET",
            })
            .then(res => res.json())
            .catch(err => console.log(err));
            setDataArr(data.reverse());
        }
        fetchData();
    }, [dataArr]);


    return (
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {dataArr.length > 0 && dataArr.map(data => <StatsCard {...data}/>)}
        </div>
    );
}

export default StatCards;