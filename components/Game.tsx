import React, { useEffect, useState } from 'react';
import { useContract, useProvider } from 'wagmi';
import GamesContract from './Games.json';
import { Text } from '@chakra-ui/react';
import moment from 'moment';


const Game = ({ gameId }: { gameId: number}) => {
    const provider = useProvider();
    const contract = useContract({
        // Add the address that was output from your deploy script
        address: '0x3454fc6ac7A7b830b232D3B2880237B50a26f92C',
        abi: GamesContract.abi,
        signerOrProvider: provider,
    });
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [startTime, setStartTime] = useState('');

  useEffect(() => {
    const getTeams = async () => {
        const homeTeam = await contract?.getGameHomeTeamName(gameId);
        const awayTeam = await contract?.getGameAwayTeamName(gameId);
        const startTime = await contract?.getGameStartTime(gameId);
        setHomeTeam(homeTeam);
        setAwayTeam(awayTeam);
        const timeFromNow = moment.unix(startTime).format("MMMM Do [at] h:mm a");
        setStartTime(timeFromNow);

    };
    getTeams();
    }, [contract, gameId]);

  return (
    <Text>{homeTeam} vs {awayTeam}, {startTime}</Text>
  );
};

export default Game;
