import React, { useEffect, useState } from 'react';
import { useContract, useProvider } from 'wagmi';
import GamesContract from './Games.json';
import { Box, Text } from '@chakra-ui/react';
import moment from 'moment';


const Game = ({ gameId }: { gameId: number}) => {
    const provider = useProvider();
    const contract = useContract({
        // Add the address that was output from your deploy script
        address: '0x2371eb2c11c27088A28b1aC8Ab1672CE059665B0',
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
