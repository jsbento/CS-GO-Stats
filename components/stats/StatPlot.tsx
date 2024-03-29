import React, { useEffect, useState } from "react";
import { PlotData, StatPlotProps } from "../../types/Plot";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), {ssr: false});

const StatPlot: React.FC<StatPlotProps> = ({ stat, title, filters }) => {
    const [data, setData] = useState<PlotData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`/api/statistics/fetch_stat?stat=${stat}&range=${filters.end}`, {
                method: "GET",
            })
            .then(res => res.json())
            .catch(err => console.log(err));
            setData(data);
        }
        fetchData();
    }, [stat, filters]);

    return (
        <div key={stat}>
            <Plot
                data={[
                    {
                        x: data?.statTimestamps,
                        y: data?.statData,
                        type: "scatter",
                        name: "Data",
                        mode: "lines+markers",
                        marker: {
                            color: "blue"
                        }
                    },
                    {
                        x: data?.statTimestamps,
                        y: data?.bestFit,
                        type: "scatter",
                        name: "Trend",
                        mode: "lines",
                        marker: {
                            color: "red"
                        },
                        line: {
                            dash: "dot",
                            width: 2
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