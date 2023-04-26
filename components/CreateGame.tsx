import React, { useState } from 'react';
import { useContract, useSigner } from 'wagmi';
import GamesContract from './Games.json';
import { Button, FormControl, Input, Text } from '@chakra-ui/react';


const CreateGame = () => {
    const {data: signer } = useSigner();
    const contract = useContract({
        // Add the address that was output from your deploy script
        address: '0x3454fc6ac7A7b830b232D3B2880237B50a26f92C',
        abi: GamesContract.abi,
        signerOrProvider: signer,
    });
  const [homeTeamId, setHomeTeamId] = useState(0);
  const [awayTeamId, setAwayTeamId] = useState(1);
  const [startTime, setStartTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setIsLoading(true); // disable login button to prevent multiple emails from being triggered

        const tx = await contract?.createGame(homeTeamId, awayTeamId, startTime);
        await tx?.wait();
        console.log('tx', tx);

    } catch (error) {
      setIsLoading(false); // re-enable login button - user may have requested to edit their email
      console.log(error);
    } finally {
        setIsLoading(false);
    }

  };
  return (
    <form onSubmit={handleSubmit}>
      <Text fontSize="lg" pb="2" fontWeight="bold">
        Create Game
      </Text>
      <FormControl id="role">
        <Input
          type="number"
          value={homeTeamId}
          border="1px solid #d9e1ec"
          onChange={(e) => setHomeTeamId(parseInt(e.target.value))}
        />
      </FormControl>
      <FormControl id="role">
        <Input
          type="number"
          value={awayTeamId}
          border="1px solid #d9e1ec"
          onChange={(e) => setAwayTeamId(parseInt(e.target.value))}
        />
      </FormControl>
      <FormControl id="role">
        <Input
          type="number"
          value={startTime}
          border="1px solid #d9e1ec"
          onChange={(e) => setStartTime(parseInt(e.target.value))}
        />
      </FormControl>

      <FormControl id="role">
        <Button
          isDisabled={startTime === 0}
          isLoading={isLoading}
          mt={2}
          colorScheme="green"
          w="full"
          type="submit"
        >
          Create
        </Button>
      </FormControl>
    </form>
  );
};

export default CreateGame;
