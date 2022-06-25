import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
const StatCards = dynamic(() => import("../components/stats/StatCards"), {ssr: false});

const Statistics: NextPage = () => {
    return (
        <StatCards />
    );
};

export default Statistics;