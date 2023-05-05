import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import DistributeWinnings  from '../components/DistributeWinnings';

const DerbyPage: NextPage = () => {
  return (
    <Box px='20'><DistributeWinnings /></Box>
  );
};

export default DerbyPage;
