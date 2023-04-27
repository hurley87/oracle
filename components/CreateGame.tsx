import React, { useState } from 'react';
import { useContract, useSigner } from 'wagmi';
import GamesContract from './Games.json';
import { Button, FormControl, Input, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const CreateGame = () => {
    const {data: signer } = useSigner();
    const contract = useContract({
        // Add the address that was output from your deploy script
        address: '0x3AacD852285a33A93806E86A68bAaA203b694EDe',
        abi: GamesContract.abi,
        signerOrProvider: signer,
    });
  const [homeTeamId, setHomeTeamId] = useState(0);
  const [awayTeamId, setAwayTeamId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setIsLoading(true); // disable login button to prevent multiple emails from being triggered

        const startTime = Math.floor(selectedDate.getTime() / 1000);
        const day = `${selectedDate.getMonth()}-${selectedDate.getDate()}-${selectedDate.getFullYear()}`


        const tx = await contract?.createGame(homeTeamId, awayTeamId, startTime, day);
        await tx?.wait();
        console.log('tx', tx);

    } catch (error) {
      setIsLoading(false); // re-enable login button - user may have requested to edit their email
      console.log(error);
    } finally {
        setIsLoading(false);
    }

  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
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
      <FormControl color="black" id="role">
        <DatePicker selected={selectedDate} onChange={handleDateChange} showTimeSelect />
      </FormControl>

      <FormControl id="role">
        <Button
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
