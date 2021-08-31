import React from 'react';
import { SimpleGrid, Input, Box, Text, Button } from '@chakra-ui/react';
import useCreate from './useCreate';

const Index = () => {
  const {
    handleChange,
    success,
    successResponse,
    error,
    errorResponse,
    productInputs,
    loading,
    handleSubmit,
  } = useCreate();
  return (
    <>
      {error && errorResponse()}
      {success && successResponse()}
      <Box boxShadow='md' bg='white' p={5}>
        <Text fontSize='3xl' mb={5}>
          Add Produt
        </Text>
        <SimpleGrid columns={2} spacingX={5} spacingY={3}>
          {productInputs.map((input, i) => {
            return (
              <div key={i}>
                <Text mb='8px'> {input.name.toUpperCase()}</Text>
                {input.component ? (
                  input.component
                ) : (
                  <Input
                    onChange={handleChange}
                    value={input.value}
                    name={input.name}
                    placeholder={input.name.toUpperCase()}
                    type={input.type ? input.type : 'text'}
                  />
                )}
              </div>
            );
          })}
        </SimpleGrid>
        <Button
          loadingText='Submitting...'
          isLoading={loading}
          bg='primary.600'
          color='white'
          mt={4}
          size='md'
          onClick={handleSubmit}
        >
          Submit Now
        </Button>
      </Box>
    </>
  );
};

export default Index;
