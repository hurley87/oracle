import React, { useEffect, useState } from 'react';
import { useContract, useProvider } from 'wagmi';
import BetsContract from './Bets.json';
import { Box } from '@chakra-ui/react';
import { Bet } from './Bet';

const Bets = ({ betId } : {  betId: number }) => {
    const provider = useProvider();
    const contract = useContract({
      address: '0xA8561fb78d20e2E6FB9e2b0bCe7305189CF7E81b',
      abi: BetsContract.abi,
      signerOrProvider: provider,
    });
    const [bets, setBets] = useState([]);

    useEffect(() => {
        const getBets = async () => {
            const bets = await contract?.getGameBets(betId);
            console.log(bets)
            setBets(bets);
        };
        getBets();
    }, [contract, betId]);

  return (
    <Box>
        {bets.map((bet: any) => (
          <Bet key={bet?.toNumber()} betId={bet?.toNumber()} />
        ))}
    </Box>
  );
};

export default Bets;
