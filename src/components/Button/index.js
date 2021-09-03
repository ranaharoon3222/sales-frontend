import React from 'react';
import { Button } from '@chakra-ui/react';

const Index = ({ children, ...rest }) => {
  return (
    <Button colorScheme='purple' mt={4} size='md' {...rest}>
      {children}
    </Button>
  );
};

export default Index;
