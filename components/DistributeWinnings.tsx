import React, { useState } from 'react';
import { useContract, useSigner } from 'wagmi';
import DerbyContract from './Derby.json';
import { Button, FormControl, Input, Text } from '@chakra-ui/react';

const DistributeWinnings = () => {
    const {data: signer } = useSigner();
    const contract = useContract({
        // Add the address that was output from your deploy script
        address: '0xeCe8DBc0faA50b50bb38140667e219a17405735e',
        abi: DerbyContract.abi,
        signerOrProvider: signer,
    });
  const [horseId, setHomeTeamId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setIsLoading(true); // disable login button to prevent multiple emails from being triggered

        const tx = await contract?.withdrawFunds();
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
        Distribute winnings for kentucky derby
      </Text>
      <FormControl id="role">
        <Input
          type="number"
          value={horseId}
          border="1px solid #d9e1ec"
          onChange={(e) => setHomeTeamId(parseInt(e.target.value))}
        />
      </FormControl>

      <FormControl id="role">
        <Button
          isLoading={isLoading}
          mt={2}
          colorScheme="green"
          w="full"
          type="submit"
        >
          Distribute Winnings
        </Button>
      </FormControl>
    </form>
  );
};

export default DistributeWinnings;
