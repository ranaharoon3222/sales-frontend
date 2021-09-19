import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from 'pages/Products/schema';
import { useStoreActions } from 'easy-peasy';
import { SubmitObject } from 'helpers/useSubmitValues';

export const useSubmit = ({
  path,
  method = 'POST',
  message = 'Product Added Succesully',
  errorMessage = 'Please Check Unique Values',
  mutate = false,
  redirect = false,
  id = false,
}) => {
  const saveProducts = useStoreActions((actions) => actions.Products.save);
  const updateProducts = useStoreActions((actions) => actions.Products.update);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    history,
    success,
    loading,
    cleanObjects,
    successResponse,
    errorResponse,
    errorCase,
    successCase,
    error,
    setLoading,
  } = SubmitObject({ mutate, errorMessage, successMessage: message });

  const newValues = (data) => {
    const brandValue = data?.brand.value;
    const unitValue = data?.unit.value;
    const updateValues = cleanObjects({
      ...data,
      brand: brandValue,
      unit: unitValue,
    });
    console.log(updateValues);

    return updateValues;
  };

  const onSubmit = (data) => {
    setLoading(true);
    const updateValues = newValues(data);

    if (method === 'POST') {
      saveProducts(updateValues)
        .then(() => {
          successCase();
          redirect && history.push(path);
        })
        .catch((err) => errorCase(err));
    } else {
      updateProducts({ updateValues, id })
        .then(() => successCase())
        .catch((err) => errorCase(err));
    }
  };

  const submitValues = {
    loading,
    successResponse,
    errorResponse,
    success,
    error,
    register,
    handleSubmit,
    errors,
    control,
  };

  return { onSubmit, submitValues };
};
