import React, { useEffect, useState } from 'react';
import { useContract, useProvider } from 'wagmi';
import ProfilesContract from './Profiles.json';
import { Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer
} from '@chakra-ui/react';
import { ethers } from 'ethers';

const makeNum = (value: string) => {
  if (value) {
    const numStr = ethers.utils.formatUnits(value, 18);
    return numStr.substring(0, numStr.indexOf('.') + 5); // keep only 2 decimals
  } else {
    return '0.0';
  }
};


const Profiles = () => {
    const provider = useProvider();
    const contract = useContract({
      address: '0xbFC6dfa970e68EC22393bE7916a0700fbe509925',
      abi: ProfilesContract.abi,
      signerOrProvider: provider,
    });
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const getProfiles = async () => {
        const profiles = await contract?.getProfiles();
        setProfiles(profiles.map((q: any) => ({ ...q })));
    };
    getProfiles();
    }, [contract]);

  return (
    <Box>
    <TableContainer>
        <Table variant='simple'>
            <Thead>
            <Tr>
                <Th>id</Th>
                <Th>username</Th>
                <Th>address</Th>
                <Th>bet count</Th>
                <Th>winnings</Th>
                <Th>losses</Th>
            </Tr>
            </Thead>
            <Tbody>
            {profiles.map((profile: any) => (
                <Tr key={profile.id.toNumber()}>
                   <Td>
                    {profile.id.toNumber()}
                   </Td>
                   <Td>
                    {profile.username}
                   </Td>
                    <Td>
                     {profile.walletAddress}
                    </Td>
                    <Td>
                     {profile.betCount.toNumber()}
                    </Td>
                    <Td>
                     {makeNum(profile.winnings)}
                    </Td>
                    <Td>
                     {makeNum(profile.losses)}
                    </Td>
                </Tr>
            ))}
            </Tbody>
            </Table>
        </TableContainer>
    </Box>
  );
};

export default Profiles;
