import React from 'react';
import { useFetch } from '../../helpers/axios';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import { GET_RECENT_CLIENTS } from '../../settings/constant';
import Skeletn from '../../components/skeleton';
import {generateKey} from '../../helpers/useUnique'

const ProductTable = () => {
  const { apiData, loading, error } = useFetch(GET_RECENT_CLIENTS);

  if (loading) {
    return <Skeletn />;
  }
  if (error) {
    return <Skeletn />;
  }

  const columns = apiData.map((item, index) => {
    return (
      <Tr key={generateKey(item.id)}>
        <Td> {item.Name} </Td>
        <Td> {item.occupation} </Td>
        <Td isNumeric> {item.monthly_income} </Td>
      </Tr>
    );
  });

  return (
    <Box backgroundColor='white' boxShadow='base'>
      <Text
        bg='primary.200'
        color='primary.700'
        p={2}
        align='center'
        fontWeight='semibold'
      >
        Recent Clients
      </Text>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Occupation</Th>
            <Th isNumeric>Monthly Income</Th>
          </Tr>
        </Thead>
        <Tbody>{columns}</Tbody>
      </Table>
    </Box>
  );
};

export default ProductTable;
