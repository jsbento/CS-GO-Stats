import React  from "react";
import { GetServerSideProps, NextPage } from "next";
import { Button } from "@chakra-ui/react";
import StatCards from "../components/stats/StatCards";
import { SWRConfig } from "swr";
import { ServerData, ServerDataResponse } from "../types/Data";

interface PageProps {
    page: number;
    fallback: ServerData[];
}

const Statistics: NextPage<PageProps> = ({ page, fallback }) => {
    return (
        <SWRConfig value={{ fallback, revalidateOnFocus: false }}>
            <div className="flex flex-col items-center">
                <Button 
                    className="mb-3"
                    onClick={async () => {
                            await fetch(`/api/statistics/fetch_stats`, {
                                method: "GET",
                            })
                            .catch(err => console.log(err));
                        }
                    }
                >
                    Update
                </Button>
                <StatCards page={page} />
            </div>
        </SWRConfig>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const data = await fetch('http://localhost:3000/api/statistics/get_all', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(res => {
        if (res.status !== 200)
            return null
        return res.json();
    })
    
    const page = ctx.req.cookies.page;
    return {
        props: {
            page: page ? parseInt(page) : 1,
            fallback: {
                results: data ? data.stats : [],
            }
        },
    };
}

export default Statistics;