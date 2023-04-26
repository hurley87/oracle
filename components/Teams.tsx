import React, { useEffect, useState } from 'react';
import { useContract, useProvider, useSigner } from 'wagmi';
import TeamsContract from './Teams.json';
import { Box, Button, Flex, FormControl, Input, Text } from '@chakra-ui/react';


const Teams = () => {
    const provider = useProvider();
    const contract = useContract({
        // Add the address that was output from your deploy script
        address: '0xCBFd3a95c0784Dd30ee88d1de2Db292222EA33B9',
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