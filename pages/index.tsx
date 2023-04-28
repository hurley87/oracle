import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Teams from '../components/Teams';
import CreateGame from '../components/CreateGame';
import Games from '../components/Games';
import Profiles from '../components/Profiles';
import { Box } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <Box p='10'><br /><ConnectButton /><Teams /><br /><br /><CreateGame /><Games /><br /><br /><Profiles /></Box>
  );
};

export default Home;
