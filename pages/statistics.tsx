import React  from "react";
import { GetServerSideProps, NextPage } from "next";
import { Button } from "@chakra-ui/react";
import StatCards from "../components/stats/StatCards";
import { SWRConfig } from "swr";
import { ServerData } from "../types/Data";

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
    const res = await fetch(`/api/statistics/get_all`);
    const data = await res.json();
    const page = ctx.req.cookies.page;
    return {
        props: {
            page: page ? parseInt(page) : 1,
            fallback: {
                results: data.stats,
            }
        },
    };
}

export default Statistics;