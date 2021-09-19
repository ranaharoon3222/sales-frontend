import { useFields } from './useFields';
import { useSubmit } from '../../../helpers/useSubmit';
import { PRODUCTS } from '../../../settings/constant';

const useCreate = () => {
  const { useFieldOptions } = useFields();

  const { id, sValue } = useFieldOptions;
  const { submitValues, onSubmit } = useSubmit({
    values: sValue,
    path: `${PRODUCTS}/${id}`,
    method: 'PUT',
    message: 'Product Updated Succssfully',
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
