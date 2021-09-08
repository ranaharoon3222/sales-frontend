import { useFields } from './useFields';
import { useSubmit } from '../../../helpers/useSubmit';
import { CLIENTS } from '../../../settings/constant';
import { Image } from '@chakra-ui/react';

const useCreate = () => {
  const { useFieldOptions } = useFields();

  const { id, image, cnic_image, apiData, mutate } = useFieldOptions;
  const { submitValues, onSubmit } = useSubmit({
    path: `${CLIENTS}/${id}`,
    method: 'PUT',
    message: 'Client Updated Succssfully',
    files: { image, cnic_image },
    mutate,
  });

  const { loading, success, successResponse, errorResponse, error } =
    submitValues;

  const ClientImages = (image) => {
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

  return {
    successResponse,
    errorResponse,
    error,
    success,
    loading,
    onSubmit,
    useFieldOptions,
    ClientImages,
  };
};

export default useCreate;
