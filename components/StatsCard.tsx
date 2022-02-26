import { Box } from '@chakra-ui/react';
import { ServerData } from '../pages/savedstats';
import React from 'react';

//https://chakra-ui.com/docs/layout/box
const StatsCard:React.FC<ServerData> = ({data}) => {
  return (
    <Box maxW="md" border="1px">
        <table className="border w-full text-left">
          <tr>
            <th>Statistic</th>
            <th>Value</th>
            <th>Percentile</th>
          </tr>
          <tr>
            <td>Accuracy</td>
            <td>{data.accuracy?.value.toPrecision(6)}</td>
            <td>{data.accuracy?.percentile}</td>
          </tr>
          <tr>
            <td>Bombs Defused</td>
            <td>{data.bombsDefused?.value}</td>
            <td>{data.bombsDefused?.percentile}</td>
          </tr>
          <tr>
            <td>Bombs Planted</td>
            <td>{data.bombsPlanted?.value}</td>
            <td>{data.bombsPlanted?.percentile}</td>
          </tr>
          <tr>
            <td>Damage</td>
            <td>{data.damage?.value}</td>
            <td>{data.damage?.percentile}</td>
          </tr>
          <tr>
            <td>Deaths</td>
            <td>{data.deaths?.value}</td>
            <td>{data.deaths?.percentile}</td>
          </tr>
          <tr>
            <td>Headshot %</td>
            <td>{data.headshotPct?.value.toPrecision(4)}</td>
            <td>{data.headshotPct?.percentile}</td>
          </tr>
          <tr>
            <td>Headshots</td>
            <td>{data.headshots?.value}</td>
            <td>{data.headshots?.percentile}</td>
          </tr>
          <tr>
            <td>Hostage Rescues</td>
            <td>{data.hostagesRescued?.value}</td>
            <td>{data.hostagesRescued?.percentile}</td>
          </tr>
          <tr>
            <td>Kills/Death</td>
            <td>{data.kd?.value.toPrecision(4)}</td>
            <td>{data.kd?.percentile}</td>
          </tr>
          <tr>
            <td>Kills</td>
            <td>{data.kills?.value}</td>
            <td>{data.kills?.percentile}</td>
          </tr>
          <tr>
            <td>Losses</td>
            <td>{data.losses?.value}</td>
            <td>{data.kills?.percentile}</td>
          </tr>
          <tr>
            <td>Matches Played</td>
            <td>{data.matchesPlayed?.value}</td>
            <td>{data.matchesPlayed?.percentile}</td>
          </tr>
          <tr>
            <td>MVPs</td>
            <td>{data.mvps?.value}</td>
            <td>{data.mvps?.percentile}</td>
          </tr>
          <tr>
            <td>Score</td>
            <td>{data.score?.value}</td>
            <td>{data.score?.percentile}</td>
          </tr>
          <tr>
            <td>Shots Fired</td>
            <td>{data.shotsFired?.value}</td>
            <td>{data.shotsFired?.percentile}</td>
          </tr>
          <tr>
            <td>Shots Hit</td>
            <td>{data.shotsHit?.value}</td>
            <td>{data.shotsHit?.percentile}</td>
          </tr>
          <tr>
            <td>Time Played</td>
            <td>{data.timePlayed?.value}</td>
            <td>{data.timePlayed?.percentile}</td>
          </tr>
          <tr>
            <td>Win/Loss</td>
            <td>{data.winLoss?.value.toPrecision(4)}</td>
            <td>{data.winLoss?.percentile}</td>
          </tr>
          <tr>
            <td>Wins</td>
            <td>{data.wins?.value}</td>
            <td>{data.wins?.percentile}</td>
          </tr>
        </table>
    </Box>
  );
}

export default StatsCard;