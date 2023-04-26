import React, { useState } from 'react';
import { useContract, useProvider, useSigner } from 'wagmi';
import TeamsContract from './Teams.json';
import { Button, FormControl, Input, Text } from '@chakra-ui/react';


const CreateTeam = () => {
    const {data: signer } = useSigner();
    const contract = useContract({
        // Add the address that was output from your deploy script
        address: '0xb716a93D76C0DA3f02CC502ca22c507fE11bCcC5',
        abi: TeamsContract.abi,
        signerOrProvider: signer,
    });
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setIsLoading(true); // disable login button to prevent multiple emails from being triggered

        const tx = await contract?.createTeam(name);
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
        Create team
      </Text>
      <FormControl id="role">
        <Input
          type="text"
          placeholder="Toronto Maple Leafs"
          value={name}
          border="1px solid #d9e1ec"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="role">
        <Button
          isDisabled={name.length === 0}
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

export default CreateTeam;
