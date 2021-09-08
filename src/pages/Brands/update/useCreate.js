import { useFields } from './useFields';
import { useSubmit } from '../../../helpers/useSubmit';
import { BRANDS } from '../../../settings/constant';

const useCreate = () => {
  const { useFieldOptions } = useFields();

  const { id, mutate } = useFieldOptions;
  const { submitValues, onSubmit } = useSubmit({
    path: `${BRANDS}/${id}`,
    method: 'PUT',
    message: 'Brand Updated Succssfully',
    mutate,
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
