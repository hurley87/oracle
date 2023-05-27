import React, { useEffect, useState } from 'react';
import { useContract, useProvider } from 'wagmi';
import TeamsContract from '../Teams.json';
import { Flex, Text } from '@chakra-ui/react';


const Teams = () => {
  const provider = useProvider();
  const contract = useContract({
      address: '0x6B5520E52C395Cc19872914A33878d53069446DC',
      abi: TeamsContract.abi,
      signerOrProvider: provider,
  });
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const getTeams = async () => {
      const teams = await contract?.getTeams();
      setTeams(teams.map((q: any) => ({ ...q })));
    };
    getTeams();
    }, [contract]);
    
  return (
    <Flex gap="4">
      {teams.map((team: any) => (
        <Text key={team.teamId.toNumber()} fontSize="xs" pb="2">
          {team.name} ({team.teamId.toNumber()})
        </Text>
      ))}
    </Flex>
  );
};

export default Teams;
