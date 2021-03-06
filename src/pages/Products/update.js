import React from 'react';
import { SimpleGrid, Box, Text } from '@chakra-ui/react';
import CustomInput from 'components/input';
import { useSubmit } from 'pages/Products/useSubmit';
import { PRODUCTS } from 'settings/constant';
import { useParams } from 'react-router-dom';
import { useFetch } from 'helpers/axios';
import Skeleton from 'components/skeleton';
import { useFields } from 'pages/Products/allFields';
import Button from 'components/Button';

const UpdateClient = () => {
  let { id } = useParams();
  const {
    apiData,
    loading: apiLoading,
    error: apiError,
    mutate,
  } = useFetch(`${PRODUCTS}/${id}`);

  const { submitValues, onSubmit } = useSubmit({
    path: `${PRODUCTS}/${id}`,
    method: 'PUT',
    mutate,
    id,
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

  const { allFields } = useFields({
    submitValues,
    apiData,
  });

  if (apiLoading) {
    return <Skeleton />;
  }

  if (apiError) {
    return apiError.message;
  }

  return (
    <div>
      {error && errorResponse()}
      {success && successResponse()}
      <Box boxShadow='md' bg='white' p={5}>
        <Text fontSize='3xl' mb={5}>
          Update Product
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
                      defaultValue={apiData[input.name]}
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

export default UpdateClient;
