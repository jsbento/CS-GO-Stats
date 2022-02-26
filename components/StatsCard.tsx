import { Box } from '@chakra-ui/react';
import { ServerData } from '../pages/savedstats';
import React from 'react';

//https://chakra-ui.com/docs/layout/box
const StatsCard:React.FC<ServerData> = ({data}) => {
  return (
    <Box>
        <div>{data.accuracy?.value}</div>
    </Box>
  );
}

export default StatsCard;