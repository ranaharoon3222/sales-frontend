import { useFields } from './useFields';
import { useSubmit } from '../../../helpers/useSubmit';
import { CLIENTS } from '../../../settings/constant';

const useCreate = () => {
  const { useFieldOptions } = useFields();

  const { reset, image, cnic_image } = useFieldOptions;

  const { submitValues, onSubmit } = useSubmit({
    reset,
    path: CLIENTS,
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
