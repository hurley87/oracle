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
      address: '0xA8561fb78d20e2E6FB9e2b0bCe7305189CF7E81b',
      abi: BetsContract.abi,
      signerOrProvider: provider,
    });
    const signerContract = useContract({
      address: '0xA8561fb78d20e2E6FB9e2b0bCe7305189CF7E81b',
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
    const [teamPickedId, setTeamPickedId] = useState<number>(0);
    const [otherTeam, setOtherTeam] = useState<number>(0);

    useEffect(() => {
        const getBets = async () => {
          const bet = await readContract?.getBet(betId);
          console.log(bet)
          setBet(bet);
          if(bet?.state === 1) {
            const gameId = bet?.gameId?.toNumber();
            console.log('gameId', gameId)
            const game = await gameContract?.getGame(gameId);
            const homeTeamId = game?.homeTeamId?.toNumber();
            console.log('homeTeamId', homeTeamId)
            const awayTeamId = game?.awayTeamId?.toNumber();
            console.log('awayTeamId', awayTeamId)
            const teamPickedId = parseInt(bet?.teamPickedId);
            console.log('teamPickedId', teamPickedId)
            setTeamPickedId(teamPickedId);
            if(teamPickedId === homeTeamId) {
              setOtherTeam(awayTeamId);
            }
            if(teamPickedId === awayTeamId) {
              setOtherTeam(homeTeamId);
            }
          }
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

  if(bet?.state === 1) {
    console.log("")
    console.log("BET", bet)
    console.log(parseInt(bet?.teamPickedId))
    console.log(bet?.gameId?.toNumber())
  }



  return (
    <div className={`flex space-x-2 text-sm`}>
        {bet?.state === 1 && showBet &&  (
            <Flex mb="4" gap="2">
                <Button isLoading={isLoading} onClick={() => handleFinish(teamPickedId)}>{teamPickedId}</Button>
                <Button isLoading={isLoading} onClick={() => handleFinish(otherTeam)}>{otherTeam}</Button>
            </Flex>
        )}
    </div>
  );
};
