import React from 'react';
import { SimpleGrid, Box, Text } from '@chakra-ui/react';
import CustomInput from 'components/input';
import { useSubmit } from 'pages/Products/useSubmit';
import { PRODUCTS } from 'settings/constant';
import { useFields } from 'pages/Products/allFields';
import Button from 'components/Button';

// eslint-disable-next-line react/prop-types
const AddClient = ({ redirect = true }) => {
  const { submitValues, onSubmit } = useSubmit({
    path: PRODUCTS,
    redirect,
  });
  const {
    loading,
    error,
    errorResponse,
    success,
    successResponse,
    handleSubmit,
    register,
    errors,
  } = submitValues;

  const { allFields } = useFields({ submitValues });

  return (
    <div>
      {error && errorResponse()}
      {success && successResponse()}

      <Box boxShadow='md' bg='white' p={5}>
        <Text fontSize='3xl' mb={5}>
          Add Product
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={2} spacingX={5} spacingY={3}>
            {allFields.map((input) => {
              return (
                <div key={input.name}>
                  <Text mb='8px'> {input.name.toUpperCase()}</Text>
                  {input.component ? (
                    input.component
                  ) : input.custom ? (
                    <CustomInput
                      isInvalid={Boolean(errors[input.name]?.message)}
                      {...register(input.name)}
                      name={input.name}
                      placeholder={input.name.toUpperCase()}
                      type={input.type ? input.type : 'text'}
                      value={input.value || ''}
                      onChange={input.onChange}
                      disabled={input.disabled}
                      error={errors[input.name]?.message}
                    />
                  ) : (
                    <CustomInput
                      isInvalid={Boolean(errors[input.name]?.message)}
                      {...register(input.name)}
                      placeholder={input.name.toUpperCase()}
                      type={input.type ? input.type : 'text'}
                      defaultValue={input.type !== 'number' ? '' : 0}
                      disabled={input.disabled}
                      error={errors[input.name]?.message}
                    />
                  )}
                </div>
              );
            })}
          </SimpleGrid>

          <Button type='submit' loadingText='Submitting...' isLoading={loading}>
            Submit Now
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default AddClient;
