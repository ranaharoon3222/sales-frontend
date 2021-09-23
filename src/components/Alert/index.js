import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';

const Index = ({ children }) => {
  return (
    <>
      <Alert status='error'>
        <AlertIcon />
        {children}
      </Alert>
    </>
  );
};

export default Index;
