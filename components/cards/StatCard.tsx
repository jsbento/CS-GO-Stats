import { Box, Table, Thead, Tr, Td, Tbody } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { StatCardProps } from "../../types/Components";
import { StatNames } from "../../types/Stats";

// Create multi stat plots over time
const StatCard: React.FC<StatCardProps> = ({ stat }) => {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ data, setData ] = useState<{ statData: number[], bestFit: number[] } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (stat === "") {
                setData(null);
                return;
            }
            setIsLoading(true);
            const data = await fetch(`/api/statistics/fetch_stat?stat=${stat}&range=0`, {
                method: "GET",
            })
            .then(res => res.json())
            .catch(err => console.log(err));
            const reverseData = {
                statData: data.statData.reverse(),
                bestFit: data.bestFit.reverse(),
            }
            setData(reverseData);
            setIsLoading(false);
        };
        fetchData();
    }, [stat]);

    return (
        <div className="items-center text-center">
            { isLoading ?
                <p className="font-semibold animate-">Loading...</p>
                :
                <>
                    <p className="font-semibold">{StatNames[stat]}</p>
                    <Box maxW="sm" border="1px" marginX={2} height={400} width={300} overflowX="scroll">
                        <Table variant="simple" size="sm" overflow-x="scroll">
                            <Thead position="sticky" top="0" backgroundColor={"gray.300"}>
                                <Tr fontWeight="bold">
                                    <Td>Value</Td><Td>Trend Diff</Td>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    data && data.statData.map((value: any, i: number ) => (
                                        <Tr textAlign={"center"}>
                                            <Td width={0.5}>{value.toPrecision(6)}</Td>
                                            <Td width={0.5}>{(value - data.bestFit[i]).toPrecision(6)}</Td>
                                        </Tr>
                                    ))
                                }
                            </Tbody>
                        </Table>
                    </Box>
                </>
            }
        </div>
    );
}

export default StatCard;