import { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useContract, useProvider, useSigner } from 'wagmi';
import BetsContract from './Bets.json';

const makeNum = (value: string) => {
  if (value) {
    const numStr = ethers.utils.formatUnits(value, 18);
    return numStr.substring(0, numStr.indexOf('.') + 5); // keep only 2 decimals
  } else {
    return '0.0';
  }
};



export const Stats = () => {
    const provider = useProvider();
    const readContract = useContract({
      address: '0xA8561fb78d20e2E6FB9e2b0bCe7305189CF7E81b',
      abi: BetsContract.abi,
      signerOrProvider: provider,
    });
    const [betsCreated, setBetsCreated] = useState<number>(0);
    const [betsAccepted, setBetsAccepted] = useState<number>(0);
    const [betsFinished, setBetsFinished] = useState<number>(0);
    const [betsCancelled, setBetsCancelled] = useState<number>(0);
    const [totalBetMoney, setTotalBetMoney] = useState<number>(0);
    const [totalRev, setTotalRev] = useState<number>(0);

    useEffect(() => {
        const getBets = async () => {
          const betsCreated = await readContract?.betsCreated()
          setBetsCreated(betsCreated?.toNumber());
          const betsAccepted = await readContract?.betsAccepted()
          setBetsAccepted(betsAccepted?.toNumber());
          const betsFinished = await readContract?.betsFinished()
          setBetsFinished(betsFinished?.toNumber());
          const betsCancelled = await readContract?.betsCancelled()
          setBetsCancelled(betsCancelled?.toNumber());
          const totalBetMoney = await readContract?.totalBetMoney()
          setTotalBetMoney(parseFloat(makeNum(totalBetMoney)));
          const totalRev = await readContract?.totalRev()
          setTotalRev(parseFloat(makeNum(totalRev)));
        };
        getBets();
    }, [readContract]);

  return (
    <div className={`flex space-x-2 text-sm`}>
        <p>bets created: {betsCreated}</p>
        <p>bets accepted: {betsAccepted}</p>
        <p>bets finished: {betsFinished}</p>
        <p>bets cancelled: {betsCancelled}</p>
        <p>total money bet: {totalBetMoney}</p>
        <p>total rev: {totalRev}</p>
    </div>
  );
};
