import React, { useEffect, useState } from "react";
import StatsCard from "../cards/StatsCard";
import { ServerData } from "../../types/Data";

const StatCards: React.FC = () => {
    const [dataArr, setDataArr] = useState<ServerData[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`/api/statistics/fetch_stats?username=${window.sessionStorage.getItem("user")}`, {
                method: "GET",
            })
            .then(res => res.json())
            .catch(err => console.log(err));
            setDataArr(data);
        }
        fetchData();
    }, []);

    return (
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {dataArr &&  dataArr.length > 0 && dataArr.map(data => <StatsCard {...data}/>)}
        </div>
    );
}

export default StatCards;