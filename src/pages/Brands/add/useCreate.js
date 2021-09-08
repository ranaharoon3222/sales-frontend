import { useFields } from './useFields';
import { useSubmit } from '../../../helpers/useSubmit';
import { BRANDS } from '../../../settings/constant';

const useCreate = () => {
  const { useFieldOptions } = useFields();

  const { reset } = useFieldOptions;

  const { submitValues, onSubmit } = useSubmit({
    reset,
    path: BRANDS,
    addResources: true,
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
