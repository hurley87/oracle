import React, { useEffect, useState } from 'react';
import { useContract, useProvider } from 'wagmi';
import GamesContract from '../Games.json';
import { Box, Link } from '@chakra-ui/react';
import Game from './Game';

const Games = () => {
  const provider = useProvider();
  const contract = useContract({
    address: '0xccD635985c65538AE8255980C82Cd787FB6d655f',
    abi: GamesContract.abi,
    signerOrProvider: provider,
  });
  const [games, setGames] = useState([]);
  

  useEffect(() => {
    const getGames = async () => {
        const games = await contract?.getGames();
        setGames(games.map((q: any) => ({ ...q })));
    };
    getGames();
    }, [contract]);

    console.log(games)

  return (
    <Box>
        {games.length}
        {games.map((game: any) => (
            <Link href={`/nba/${game.gameId.toNumber()}`} key={game.gameId.toNumber()}>
                <Game gameId={game.gameId.toNumber()} />
            </Link>
        ))}
    </Box>
  );
};

export default Games;
