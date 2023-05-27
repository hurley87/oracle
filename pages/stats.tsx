import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Stats } from '../components/NHL/Stats';

const StatsPage: NextPage = () => {
  return (
    <Box px='20'><Stats /></Box>
  );
};

export default StatsPage;
