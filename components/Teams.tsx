import React, { useEffect, useState } from 'react';
import { useContract, useProvider, useSigner } from 'wagmi';
import TeamsContract from './Teams.json';
import { Box, Button, FormControl, Input, Text } from '@chakra-ui/react';


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

    console.log('teams', teams)

  return (
    <Box>
        {teams.map((team: any) => (
            <Box key={team.teamId.toNumber()}>
                <Text key={team.teamId.toNumber()} fontSize="lg" pb="2" fontWeight="bold">
                    {team.name} ({team.teamId.toNumber()})
                </Text>
            </Box>
        ))}
    </Box>
  );
};

export default Teams;
