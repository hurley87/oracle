import React, { useEffect, useState } from 'react';
import { useContract, useProvider } from 'wagmi';
import GamesContract from './Games.json';
import { Box, Link } from '@chakra-ui/react';
import Game from './Game';

const Games = () => {
    const provider = useProvider();
    const contract = useContract({
      address: '0x3454fc6ac7A7b830b232D3B2880237B50a26f92C',
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

  return (
    <Box>
        {games.length}
        {games.map((game: any) => (
            <Link href={`/games/${game.gameId.toNumber()}`} key={game.gameId.toNumber()}>
                <Game gameId={game.gameId.toNumber()} />
            </Link>
        ))}
    </Box>
  );
};

export default Games;
