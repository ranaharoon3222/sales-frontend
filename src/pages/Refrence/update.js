import { SimpleGrid, Box, Text, Image } from '@chakra-ui/react';
import CustomInput from 'components/input';
import { useSubmit } from 'pages/Refrence/useSubmit';
import { REFRENCES } from 'settings/constant';
import { useParams } from 'react-router-dom';
import { useFetch } from 'helpers/axios';
import Skeleton from 'components/skeleton';
import { useFields } from 'pages/Refrence/allFields';
import Button from 'components/Button';

const UpdateRefrence = () => {
  let { id } = useParams();
  const {
    apiData,
    loading: apiLoading,
    error: apiError,
    mutate,
  } = useFetch(`${REFRENCES}/${id}`);

  const { submitValues, onSubmit } = useSubmit({
    path: `${REFRENCES}/${id}`,
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
    handleChange,
    handleSubmit,
    register,
    control,
    errors,
  } = submitValues;

  const { allFields } = useFields({ handleChange, control, apiData });

  if (apiLoading) {
    return <Skeleton />;
  }

  if (apiError) {
    return apiError.message;
  }

  const clientImages = (image) => {
    return (
      <div>
        <Image
          boxSize='150px'
          borderRadius='full'
          objectFit='cover'
          src={`http://localhost:1337${apiData?.[image]?.url}`}
          alt={apiData?.[image]?.name}
          fallbackSrc='https://via.placeholder.com/150'
        />
        <h3> {image === 'image' ? 'Client Image' : 'Cnic Image'} </h3>
      </div>
    );
  };

  return (
    <div>
      {error && errorResponse()}
      {success && successResponse()}
      <Box boxShadow='md' bg='white' p={5}>
        <SimpleGrid columns={2} spacingX={1} spacingY={1}>
          {clientImages('image')}
          {clientImages('cnic_image')}
        </SimpleGrid>
        <Text fontSize='3xl' mb={5}>
          Add Refrence
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
                      value={input.value}
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

export default UpdateRefrence;
