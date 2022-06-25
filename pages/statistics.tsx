import React  from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { Button } from "@chakra-ui/react";
const StatCards = dynamic(() => import("../components/stats/StatCards"), {ssr: false});

const Statistics: NextPage = () => {
    return (
        <div className="flex flex-col items-center">
            <Button 
                className="mb-3"
                onClick={async () => {
                        await fetch(`/api/statistics/fetch_stats`, {
                            method: "GET",
                        })
                        .then(res => console.log(res.status))
                        .catch(err => console.log(err));
                    }
                }
            >
                Update
            </Button>
            <StatCards />
        </div>
    );
};    

export default Statistics;