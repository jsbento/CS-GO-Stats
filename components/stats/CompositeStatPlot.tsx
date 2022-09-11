import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CompositePlotProps } from "../../types/Plot";
const Plot = dynamic(() => import("react-plotly.js"), {ssr: false});

const CompositeStatPlot: React.FC<CompositePlotProps> = ({ statA, statB, title }) => {
    const [data, setData] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`/api/statistics/fetch_composite?statA=${statA}&statB=${statB}`, {
                method: "GET",
            })
            .then(res => res.json())
            .catch(err => console.log(err));
            setData(data);
        }
        fetchData();
    }, [statA, statB]);

    return (
        <div key={`${statA}_${statB}`}>
            <Plot
                data={[
                    {
                        x: data?.statAData,
                        y: data?.statBData,
                        type: "scatter",
                        name: `${statA} vs ${statB}`,
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
                            title: statA
                        },
                        yaxis: {
                            title: statB
                        }
                    }
                }
            />
        </div>
    );
}

export default CompositeStatPlot;