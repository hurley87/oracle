import React, { useEffect, useState } from 'react';
import { useContract, useProvider } from 'wagmi';
import ProfilesContract from './Profiles.json';
import { Box, Link,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer
} from '@chakra-ui/react';
import Game from './Game';

const Profiles = () => {
    const provider = useProvider();
    const contract = useContract({
      address: '0x7C98F5fb1c227Af0db2F74cCb38e2e40f84F3E27',
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

    console.log(profiles)

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
                     {profile.winnings.toNumber()}
                    </Td>
                    <Td>
                     {profile.losses.toNumber()}
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
