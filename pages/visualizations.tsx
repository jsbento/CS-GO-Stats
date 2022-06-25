import { NextPage } from "next";
import React from "react";
import { StatNames } from "../types/Stats";
import StatPlot from "../components/stats/StatPlot";

const Visualizations: NextPage = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {Object.keys(StatNames).map(key => <StatPlot stat={key} title={StatNames[key]} />)}
    </div>
  );
}

export default Visualizations;