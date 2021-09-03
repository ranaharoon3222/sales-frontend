import React from 'react';
import { useFetch } from '../../helpers/axios';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import { GET_RECENT_PRODUCTS } from '../../settings/constant';
import Skeletn from '../../components/skeleton';

const ProductTable = () => {
  const { apiData, loading, error } = useFetch({
    method: 'GET',
    url: GET_RECENT_PRODUCTS,
  });

  if (loading) {
    return <Skeletn />;
  }
  if (error) {
    return error.message;
  }

  const columns = apiData.map((item, index) => {
    return (
      <Tr key={index}>
        <Td> {item.product_name} </Td>
        <Td> {item.sale_price} </Td>
        <Td isNumeric> {item.stock} </Td>
      </Tr>
    );
  });

  return (
    <>
      <Box backgroundColor='white' boxShadow='base'>
        <Text
          bg='primary.200'
          color='primary.700'
          p={2}
          align='center'
          fontWeight='semibold'
        >
          Recent Products
        </Text>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Sale Price</Th>
              <Th isNumeric>Stock</Th>
            </Tr>
          </Thead>
          <Tbody>{columns}</Tbody>
        </Table>
      </Box>
    </>
  );
};

export default ProductTable;
