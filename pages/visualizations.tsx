import { NextPage } from "next";
import React from "react";
import { StatNames, StatOptions } from "../types/Stats";
import Dropdown from "../components/Dropdown";
import dynamic from "next/dynamic";
const StatPlot = dynamic(() => import("../components/stats/StatPlot"), {ssr: false});

const Visualizations: NextPage = () => {
  const [stat, setStat] = React.useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStat(e.target.value);
  }

  return (
    <div className="flex flex-col items-center">
      <Dropdown label="Stat Options" value={stat} options={StatOptions} onChange={onChange} />
      <div>
        {stat !== '' && <StatPlot stat={stat} title={StatNames[stat]} />}
      </div>
    </div>
  );
}

export default Visualizations;