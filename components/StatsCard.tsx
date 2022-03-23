import { Box, Table, Thead, Tr, Td, Th, Tbody, TableCaption } from '@chakra-ui/react';
import { ServerData } from '../pages/savedstats';
import React from 'react';

//https://chakra-ui.com/docs/layout/box
const StatsCard:React.FC<ServerData> = ({data, timestamp}) => {
  if(data == null) {
    return (
      <p>No data found for the given username.</p>
    );
  }
  return (
    <Box maxW="sm" border="1px">
        <Table variant="simple" size="sm">
          <TableCaption>Data from {new Date(timestamp).toString()}</TableCaption>
          <Thead>
            <Tr>
              <Th>Statistic</Th><Th>Value</Th><Th>Percentile</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Accuracy</Td><Td>{data.accuracy?.value.toPrecision(6)}</Td><Td>{data.accuracy?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>Bombs Defused</Td><Td>{data.bombsDefused?.value}</Td><Td>{data.bombsDefused?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>Bombs Planted</Td><Td>{data.bombsPlanted?.value}</Td><Td>{data.bombsPlanted?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>Damage</Td><Td>{data.damage?.value}</Td><Td>{data.damage?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>Deaths</Td><Td>{data.deaths?.value}</Td><Td>{data.deaths?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>Headshot %</Td><Td>{data.headshotPct?.value.toPrecision(4)}</Td><Td>{data.headshotPct?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>Headshots</Td><Td>{data.headshots?.value}</Td><Td>{data.headshots?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>Hostage Rescues</Td><Td>{data.hostagesRescued?.value}</Td><Td>{data.hostagesRescued?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>Kills/Death</Td><Td>{data.kd?.value.toPrecision(4)}</Td><Td>{data.kd?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>Kills</Td><Td>{data.kills?.value}</Td><Td>{data.kills?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>Losses</Td><Td>{data.losses?.value}</Td><Td>{data.kills?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>Matches Played</Td><Td>{data.matchesPlayed?.value}</Td><Td>{data.matchesPlayed?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>MVPs</Td><Td>{data.mvps?.value}</Td><Td>{data.mvps?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>Score</Td><Td>{data.score?.value}</Td><Td>{data.score?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>Shots Fired</Td><Td>{data.shotsFired?.value}</Td><Td>{data.shotsFired?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>Shots Hit</Td><Td>{data.shotsHit?.value}</Td><Td>{data.shotsHit?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>Time Played</Td><Td>{data.timePlayed?.value}</Td><Td>{data.timePlayed?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>Win/Loss</Td><Td>{data.winLoss?.value.toPrecision(4)}</Td><Td>{data.winLoss?.percentile}</Td>
            </Tr>
            <Tr>
              <Td>Wins</Td><Td>{data.wins?.value}</Td><Td>{data.wins?.percentile}</Td>
            </Tr>
            </Tbody>
        </Table>
    </Box>
  );
}

export default StatsCard;