import { NextPage } from "next";
import React from "react";
import { StatNames, StatOptions } from "../types/Stats";
import Dropdown from "../components/Dropdown";
import dynamic from "next/dynamic";
const StatPlot = dynamic(() => import("../components/stats/StatPlot"), {ssr: false});
const CompositeStatPlot = dynamic(() => import("../components/stats/CompositeStatPlot"), {ssr: false});

const Visualizations: NextPage = () => {
  const [stat, setStat] = React.useState<string>('');
  const [statA, setStatA] = React.useState<string>('');
  const [statB, setStatB] = React.useState<string>('');
  const [tab , setTab] = React.useState<string>('single');

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row mb-3">
        <button
          className={`font-semibold text-center w-36 p-2 m-2 rounded-md border-2 border-gray-300 ${tab === 'single' ? 'bg-gray-300' : ''}`}
          onClick={() => setTab('single')}
        >
          Single Stat
        </button>
        <button
          className={`font-semibold text-center w-36 p-2 m-2 rounded-md border-2 border-gray-300 ${tab === 'composite' ? 'bg-gray-300' : ''}`}
          onClick={() => setTab('composite')}
        >
          Composite Stat
        </button>
      </div>
      {
        tab === 'single' ?
        <>
          <Dropdown label="Stat Options" value={stat} options={StatOptions} onChange={(e) => setStat(e.target.value)} />
          <div>
            {stat && <StatPlot stat={stat} title={StatNames[stat]} />}
          </div>
        </>
        :
        <>
          <div className="flex flex-row">
            <Dropdown label="Stat X" value={statA} options={StatOptions} onChange={(e) => setStatA(e.target.value)} />
            <Dropdown label="Stat Y" value={statB} options={StatOptions.filter(o => o.value !== statA)} onChange={(e) => setStatB(e.target.value)} />
          </div>
          <div>
            {statA && statB && <CompositeStatPlot statA={statA} statB={statB} title={`${StatNames[statB]} vs ${StatNames[statA]}`} />}
          </div>
        </>
      }
    </div>
  );
}

export default Visualizations;