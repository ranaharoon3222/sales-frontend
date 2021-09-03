import React from 'react';
import {
  SimpleGrid,
  Input,
  Box,
  Text,
  FormHelperText,
  FormControl,
} from '@chakra-ui/react';
import useCreate from './useSubmit';
import Skeleton from '../../../components/skeleton';
import Button from '../../../components/Button';
import { useDelete } from '../../../helpers/useDelete';
import { PRODUCTS } from '../../../settings/constant';

const Index = () => {
  const {
    success,
    successResponse,
    errorResponse,
    loading,
    onSubmit,
    useFieldOptions,
    error,
  } = useCreate();

  const {
    productFields,
    register,
    formError,
    handleChange,
    handleSubmit,
    loading: apiLoading,
    apiError,
    id,
  } = useFieldOptions;

  const { handleDelete } = useDelete({
    path: `${PRODUCTS}/${id}`,
    title: 'Product Deleted Succcessfully',
    redirect: PRODUCTS,
  });

  if (apiLoading) {
    return <Skeleton />;
  }
  if (apiError) {
    return apiError.meesage;
  }

  const productInputs = () => {
    return productFields.map((input, i) => {
      return (
        <FormControl key={input.name} id={input.name}>
          <Text mb='8px'> {input.name.toUpperCase()}</Text>
          {input.component ? (
            <>
              {input.component}
              <FormHelperText color='red.600'>
                {formError[input.name]?.message}
              </FormHelperText>
            </>
          ) : (
            <>
              {input.custom ? (
                <>
                  <Input
                    isInvalid={Boolean(formError[input.name]?.message)}
                    {...register(input.name)}
                    name={input.name}
                    placeholder={input.name.toUpperCase()}
                    type={input.type ? input.type : 'text'}
                    value={input.value}
                    onChange={handleChange}
                    disabled={input.disabled}
                  />
                </>
              ) : (
                <Input
                  isInvalid={Boolean(formError[input.name]?.message)}
                  {...register(input.name)}
                  placeholder={input.name.toUpperCase()}
                  type={input.type ? input.type : 'text'}
                  defaultValue={input.defaultValue}
                  disabled={input.disabled}
                />
              )}

              <FormHelperText>{formError[input.name]?.message}</FormHelperText>
            </>
          )}
        </FormControl>
      );
    });
  };
  return (
    <>
      {error && errorResponse()}
      {success && successResponse()}
      <Box boxShadow='md' bg='white' p={5}>
        <Text fontSize='3xl' mb={5}>
          Update Produt
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={2} spacingX={5} spacingY={3}>
            {productInputs()}
          </SimpleGrid>
          <Button loadingText='Submitting...' isLoading={loading} type='submit'>
            Submit Now
          </Button>
          <Button
            loadingText='Deleting...'
            isLoading={loading}
            bg='red.600'
            ml={4}
            onClick={handleDelete}
          >
            Delete Now
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Index;
