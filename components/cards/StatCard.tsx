import { Box, Table, Thead, Tr, Td, Tbody, TableCaption } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { StatCardProps } from "../../types/Components";
import { StatNames } from "../../types/Stats";

// Create multi stat plots over time
const StatCard: React.FC<StatCardProps> = ({ stat }) => {
    const [ data, setData ] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (stat === "") {
                setData(null);
                return;
            }
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
        };
        fetchData();
    }, [stat]);

    return (
        <div className="items-center text-center">
            <p className="font-semibold">{StatNames[stat]}</p>
            <Box maxW="sm" border="1px" marginX={2} height={400} width={250} overflowX="scroll">
                <Table variant="simple" size="sm" overflow-x="scroll">
                    <Thead position="sticky" top="0" backgroundColor={"gray.300"}>
                        <Tr fontWeight="bold">
                            <Td>Value</Td><Td>Trend Diff</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data && data.statData.map((value: any, i: number ) => (
                                <Tr>
                                    <Td width={0.5}>{value.toPrecision(6)}</Td>
                                    <Td width={0.5}>{(value - data.bestFit[i]).toPrecision(6)}</Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </Box>
        </div>
    );
}

export default StatCard;