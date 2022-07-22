import React, { useEffect, useState } from "react";
import { PlotData, StatPlotProps } from "../../types/Plot";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), {ssr: false});

const StatPlot: React.FC<StatPlotProps> = ({ stat, title }) => {
    const [data, setData] = useState<PlotData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`/api/statistics/fetch_stat?stat=${stat}`, {
                method: "GET",
            })
            .then(res => res.json())
            .catch(err => console.log(err));
            setData(data);
        }
        fetchData();
    }, []);

    return (
        <div key={stat}>
            <Plot
                data={[
                    {
                        x: data?.statTimestamps,
                        y: data?.statData,
                        type: "scatter",
                        mode: "lines+markers",
                        marker: {
                            color: "blue"
                        }
                    }
                ]}
                layout={
                    {
                        width: 500,
                        height: 500,
                        title, 
                        xaxis: {
                            title: "last 30 days"
                        },
                        yaxis: {
                            title: stat
                        }
                    }
                }
            />
        </div>
    );
}

export default StatPlot;