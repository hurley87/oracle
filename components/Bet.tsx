import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { useContract, useProvider, useSigner } from 'wagmi';
import BetsContract from './Bets.json';
import { Button, Flex } from '@chakra-ui/react';

export const Bet = ({ betId }: { betId: BigNumber }) => {
    const provider = useProvider();
    const { data: signer } = useSigner();
    const readContract = useContract({
      address: '0xab8336506FFE6ed005c711A114F376D6d6E18D03',
      abi: BetsContract.abi,
      signerOrProvider: provider,
    });
    const signerContract = useContract({
      address: '0xab8336506FFE6ed005c711A114F376D6d6E18D03',
      abi: BetsContract.abi,
      signerOrProvider: signer,
    });
    const [bet, setBet] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [showBet, setShowBet] = useState(true);

    useEffect(() => {
        const getBets = async () => {
            const bet = await readContract?.getBet(betId);
            setBet(bet);
        };
        getBets();
    }, [readContract, betId]);


    async function handleFinish(teamId: number) {
        setIsLoading(true)
        const tx = await signerContract?.finishBet(betId, teamId);
        const receipt = await tx.wait();
        console.log(receipt);
        setIsLoading(false)
        setShowBet(false)
    }


  return (
    <div className={`flex space-x-2 text-sm`}>
        {bet?.state === 1 && showBet &&  (
            <Flex mb="4" gap="2">
                <Button isLoading={isLoading} onClick={() => handleFinish(bet?.teamPickedId.toNumber())}>{bet?.teamPickedId.toNumber()}</Button>
                <Button isLoading={isLoading} onClick={() => handleFinish(bet?.otherTeamPickedId.toNumber())}>{bet?.otherTeamPickedId.toNumber()}</Button>
            </Flex>
        )}
    </div>
  );
};
