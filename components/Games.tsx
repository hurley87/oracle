import React, { useEffect, useState } from 'react';
import { useContract, useProvider } from 'wagmi';
import GamesContract from './Games.json';
import { Box, Link } from '@chakra-ui/react';
import Game from './Game';

const Games = () => {
    const provider = useProvider();
    const contract = useContract({
      address: '0x2371eb2c11c27088A28b1aC8Ab1672CE059665B0',
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

    console.log('games', games)

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
