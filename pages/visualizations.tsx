import { NextPage } from "next";
import React, { useEffect } from "react";
import { PlotData } from "../types/PlotData";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), {ssr: false});

const Visualizations: NextPage = () => {
  const [killsData, setKillsData] = React.useState<PlotData | null>(null);

  useEffect(() => {
    const fetchData = async (stat: string) => {
      const killsData = await fetch(`/api/statistics/fetch_stat?username=${window.sessionStorage.getItem("user")}&stat=${stat}`, {
        method: "GET",
      })
      .then(res => res.json())
      .catch(err => console.log(err));
      setKillsData(killsData);
      console.log(killsData);
    }
    fetchData("kills");
  }, []);

  return (
    <Plot
      data={[
        {
          x: killsData?.statTimestamps,
          y: killsData?.statData,
          type: "scatter",
          mode: "lines+markers",
          marker: {
            color: "blue"
          }
        }
      ]}
      layout={{width: 600, height: 600, title: "Kills"}}
    />
  );
}

export default Visualizations;