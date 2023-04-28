import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Teams from '../components/Teams';
import CreateGame from '../components/CreateGame';
import Games from '../components/Games';
import Profiles from '../components/Profiles';

const Home: NextPage = () => {
  return (
    <div><ConnectButton /><Teams /><CreateGame /><Games /><Profiles /></div>
  );
};

export default Home;
