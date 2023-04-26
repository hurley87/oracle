import React, { useEffect, useState } from 'react';
import { useContract, useProvider } from 'wagmi';
import BetsContract from './Bets.json';
import { Box } from '@chakra-ui/react';
import { Bet } from './Bet';

const Bets = ({ betId } : {  betId: number }) => {
    const provider = useProvider();
    const contract = useContract({
      address: '0xab8336506FFE6ed005c711A114F376D6d6E18D03',
      abi: BetsContract.abi,
      signerOrProvider: provider,
    });
    const [bets, setBets] = useState([]);

    useEffect(() => {
        const getBets = async () => {
            const bets = await contract?.getGameBets(betId);
            setBets(bets);
        };
        getBets();
    }, [contract, betId]);

  return (
    <Box>
        {bets.length}
        {bets.map((bet: any) => (
            <Bet key={bet?.toNumber()} betId={bet?.toNumber()} />
        ))}
    </Box>
  );
};

export default Bets;
