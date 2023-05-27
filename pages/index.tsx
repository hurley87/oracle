import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Teams from '../components/NHL/Teams';
import CreateGame from '../components/NHL/CreateGame';
import Games from '../components/NHL/Games';
import Profiles from '../components/NHL/Profiles';
import { Box } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <Box px='20'><ConnectButton /><Teams /><br /><br /><CreateGame /><Games /><br /><br /><Profiles /></Box>
  );
};

export default Home;
