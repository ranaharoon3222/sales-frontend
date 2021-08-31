import React from 'react';
import { SkeletonText } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
const Index = () => {
  return (
    <Box padding='6' boxShadow='base' bg='white'>
      <SkeletonText mt='4' noOfLines={5} spacing='7' />
    </Box>
  );
};

export default Index;
