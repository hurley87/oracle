import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Teams from '../components/NBA/Teams';
import CreateGame from '../components/NBA/CreateGame';
import Games from '../components/NBA/Games';
import Profiles from '../components/NBA/Profiles';
import { Box } from '@chakra-ui/react';
import CreateTeam from '../components/NBA/CreateTeam';

const NBA: NextPage = () => {
  return (
    <Box px='20'><ConnectButton /><CreateTeam /><Teams /><br /><br /><CreateGame /><Games /><br /><br /><Profiles /></Box>
  );
};

export default NBA;
