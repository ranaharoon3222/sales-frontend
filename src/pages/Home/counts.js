import React from 'react';
import { useFetch } from '../../helpers/axios';
import { Box, Text } from '@chakra-ui/react';

const ProductTable = ({ url, heading }) => {
  const { apiData, error } = useFetch({
    method: 'GET',
    url: url,
  });

  if (error) {
    return error.message;
  }

  return (
    <>
      <Box backgroundColor='white' boxShadow='base' py={5} mt={2}>
        <Text textAlign='center' fontWeight='bold' fontSize='xl'>
          {heading}
        </Text>
        <Text textAlign='center' fontWeight='bold' fontSize='2xl' mt={2}>
          {apiData}
        </Text>
      </Box>
    </>
  );
};

export default ProductTable;
