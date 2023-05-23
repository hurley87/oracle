import React, { useState } from 'react';
import { useContract, useSigner } from 'wagmi';
import MojoContract from './Mojo.json';
import { Button, FormControl, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';

const makeBig = (value: string) => {
    return ethers.utils.parseUnits(value);
  };
  

const Mint = () => {
    const {data: signer } = useSigner();
    const contract = useContract({
        address: '0x5E5676B7016E4C5EC0d2329EF814CD8B1efad808',
        abi: MojoContract.abi,
        signerOrProvider: signer,
    });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setIsLoading(true); // disable login button to prevent multiple emails from being triggered

        const tx = await contract?.mint(makeBig("100"));
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
        Mint 100
      </Text>

      <FormControl id="role">
        <Button
          isLoading={isLoading}
          mt={2}
          colorScheme="green"
          w="full"
          type="submit"
        >
          Mint
        </Button>
      </FormControl>
    </form>
  );
};

export default Mint;
