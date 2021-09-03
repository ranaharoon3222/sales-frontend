import { useFields } from './useFields';
import { useSubmit } from '../../../helpers/useSubmit';
import { CLIENTS } from '../../../settings/constant';

const useCreate = () => {
  const { useFieldOptions } = useFields();

  const { id, image, cnic_image } = useFieldOptions;
  const { submitValues, onSubmit } = useSubmit({
    path: `${CLIENTS}/${id}`,
    method: 'PUT',
    message: 'Client Updated Succssfully',
    files: { image, cnic_image },
  });

  const { loading, success, successResponse, errorResponse, error } =
    submitValues;

  return {
    successResponse,
    errorResponse,
    error,
    success,
    loading,
    onSubmit,
    useFieldOptions,
  };
};

export default useCreate;
