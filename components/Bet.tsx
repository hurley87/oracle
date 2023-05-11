import { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useContract, useProvider, useSigner } from 'wagmi';
import BetsContract from './Bets.json';
import { Button, Flex } from '@chakra-ui/react';
import GamesContract from './Games.json';

export const Bet = ({ betId }: { betId: BigNumber }) => {
    const provider = useProvider();
    const { data: signer } = useSigner();
    const readContract = useContract({
      address: '0x9362dbBbfe513Ca553F627B2e57fE98122d22A73',
      abi: BetsContract.abi,
      signerOrProvider: provider,
    });
    const signerContract = useContract({
      address: '0x9362dbBbfe513Ca553F627B2e57fE98122d22A73',
      abi: BetsContract.abi,
      signerOrProvider: signer,
    });
    const gameContract = useContract({
      address: '0xadE9877B3fCC4EF1aEA48eE03662B1b0c822b552',
      abi: GamesContract.abi,
      signerOrProvider: provider,
    });
    const [bet, setBet] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [showBet, setShowBet] = useState(true);

    useEffect(() => {
        const getBets = async () => {
          const bet = await readContract?.getBet(betId);
          console.log(bet)
          const betsCreated = await readContract?.betsCreated()
          console.log('betsCreated')
          console.log(betsCreated?.toNumber())
          setBet(bet);
        };
        getBets();
    }, [readContract, betId, gameContract]);


    async function handleFinish(teamId: number) {
        setIsLoading(true)
        const tx = await signerContract?.finishBet(betId, teamId);
        const receipt = await tx.wait();
        console.log(receipt);
        setIsLoading(false)
        setShowBet(false)
    }

  console.log(bet)


  return (
    <div className={`flex space-x-2 text-sm`}>
        {bet?.state === 1 && showBet &&  (
            <Flex mb="4" gap="2">
                <Button isLoading={isLoading} onClick={() => handleFinish(bet?.teamPickedId?.toNumber())}>{bet?.teamPickedId?.toNumber()}</Button>
                <Button isLoading={isLoading} onClick={() => handleFinish(bet?.otherTeamPickedId?.toNumber())}>{bet?.otherTeamPickedId?.toNumber()}</Button>
            </Flex>
        )}
    </div>
  );
};
