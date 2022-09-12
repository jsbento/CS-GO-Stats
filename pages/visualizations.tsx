import { NextPage } from "next";
import React, { useState } from "react";
import { StatNames, StatOptions, PullRangeOptions, StatFilters } from "../types/Stats";
import Dropdown from "../components/Dropdown";
import dynamic from "next/dynamic";
const StatPlot = dynamic(() => import("../components/stats/StatPlot"), {ssr: false});
const CompositeStatPlot = dynamic(() => import("../components/stats/CompositeStatPlot"), {ssr: false});

const Visualizations: NextPage = () => {
  const [stat, setStat] = useState<string>('');
  const [statA, setStatA] = useState<string>('');
  const [statB, setStatB] = useState<string>('');
  const [tab , setTab] = useState<string>('single');
  const [filterValue, setFilterValue] = useState<string>('');
  const [filters, setFilters] = useState<StatFilters>({ start: 0, end: 0 });

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
          <div className="flex flex-row mb-3">
            <Dropdown
              label="Stat Options"
              value={stat}
              options={StatOptions}
              onChange={(e) => setStat(e.target.value)}
            />
            <Dropdown
              label="Pull Range"
              value={filterValue}
              options={PullRangeOptions}
              onChange={(e) => {
                setFilterValue(e.target.value);
                setFilters({ start: 0, end: parseInt(e.target.value) });
              }}
              />
          </div>
          <div>
            {stat && <StatPlot stat={stat} title={StatNames[stat]} filters={filters} />}
          </div>
        </>
        :
        <>
          <div className="flex flex-row">
            <Dropdown
              label="Stat X"
              value={statA}
              options={StatOptions.filter(o => o.value !== statB)}
              onChange={(e) => setStatA(e.target.value)}
            />
            <Dropdown
              label="Stat Y"
              value={statB}
              options={StatOptions.filter(o => o.value !== statA)}
              onChange={(e) => setStatB(e.target.value)}
            />
          </div>
          <div>
            {statA && statB &&
              <CompositeStatPlot
                statA={statA}
                statB={statB} 
                title={`${StatNames[statB]} vs ${StatNames[statA]}`}
              />
            }
          </div>
        </>
      }
    </div>
  );
}

export default Visualizations;