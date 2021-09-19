import { useFields } from './useFields';
import { useSubmit } from '../../../helpers/useSubmit';
import { PRODUCTS } from '../../../settings/constant';

const useCreate = () => {
  const { useFieldOptions } = useFields();

  const { setSvalue, sValue, reset } = useFieldOptions;
  const { submitValues, onSubmit } = useSubmit({
    setValues: setSvalue,
    values: sValue,
    reset,
    path: PRODUCTS,
    clearFields: {
      product_name: '',
      print_name: '',
      stock_value: '',
      stock: '',
      purchase_price: '',
    },
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
