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
import Button from '../../../components/Button';

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

  const { productFields, register, formError, handleChange, handleSubmit } =
    useFieldOptions;

  const productInputs = () => {
    return productFields.map((input, i) => {
      return (
        <div key={input.name}>
          <Text mb='8px'> {input.name.toUpperCase()}</Text>
          {input.component ? (
            input.component
          ) : (
            <FormControl id={input.name}>
              {input.custom ? (
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
              ) : (
                <Input
                  isInvalid={Boolean(formError[input.name]?.message)}
                  {...register(input.name)}
                  placeholder={input.name.toUpperCase()}
                  type={input.type ? input.type : 'text'}
                  defaultValue={input.type !== 'number' ? '' : 0}
                  disabled={input.disabled}
                />
              )}

              <FormHelperText>{formError[input.name]?.message}</FormHelperText>
            </FormControl>
          )}
        </div>
      );
    });
  };
  return (
    <>
      {error && errorResponse()}
      {success && successResponse()}
      <Box boxShadow='md' bg='white' p={5}>
        <Text fontSize='3xl' mb={5}>
          Add Client
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={2} spacingX={5} spacingY={3}>
            {productInputs()}
          </SimpleGrid>

          <Button loadingText='Submitting...' isLoading={loading} type='submit'>
            Submit Now
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Index;
