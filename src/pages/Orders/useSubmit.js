import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';

import { useStoreActions, useStoreState } from 'easy-peasy';
import { SubmitObject } from 'helpers/useSubmitValues';

export const useSubmit = ({
  path,
  method = 'POST',
  message = 'Order Added Succesully',
  errorMessage = 'Please Check Unique Values',
  mutate = false,
  redirect = false,
  id = false,
}) => {
  const saveOrder = useStoreActions((actions) => actions.Orders.save);
  const updateOrder = useStoreActions((actions) => actions.Orders.update);
  const cartItems = useStoreState((state) => state.Orders.cart);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    reset,
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
    const client = data.client?.value;

    const updateValues = cleanObjects({
      ...data,
      installments: cartItems?.[0]?.installments,
      client,
    });
    console.log(updateValues, 'updateValues');

    return updateValues;
  };

  const onSubmit = (data) => {
    setLoading(true);
    const updateValues = newValues(data);

    if (method === 'POST') {
      saveOrder(updateValues)
        .then((e) => {
          successCase(e);
          redirect && history.push(path);
        })
        .catch((err) => errorCase(err, 'order'));
    } else {
      updateOrder({ updateValues, id })
        .then(() => successCase())
        .catch((err) => errorCase(err, 'order'));
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
    watch,
    setValue,
    reset,
  };

  return { onSubmit, submitValues };
};
