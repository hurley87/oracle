import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import CreateTeam from '../components/CreateTeam';
import Teams from '../components/Teams';
import CreateGame from '../components/CreateGame';
import Games from '../components/Games';

const Home: NextPage = () => {
  return (
    <div><ConnectButton /><CreateTeam /><Teams /><CreateGame /><Games /></div>
  );
};

export default Home;
