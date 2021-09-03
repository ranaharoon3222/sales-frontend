import React from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { Alert } from '@chakra-ui/react';

export const useResponses = ({
  successLabel = 'Product Created Successfully',
  error,
}) => {
  const successResponse = () => {
    return (
      <Alert status='success'>
        <AiFillCheckCircle
          size='25px'
          color='green'
          style={{ marginRight: '10px' }}
        />
        {successLabel}
      </Alert>
    );
  };
  const errorResponse = () => {
    return (
      <Alert status='error'>
        <AiFillCloseCircle
          size='25px'
          color='red'
          style={{ marginRight: '10px' }}
        />
        {error}
      </Alert>
    );
  };

  return { successResponse, errorResponse };
};
