import { useState } from 'react';
import { useCleanObjects } from './useCleanObjects';
import { useResponses } from './useResponses';
import { useToasts } from './useToast';

export const useOrderSubmit = ({
  setValues = false,
  values = false,
  reset = false,
  path,
  clearFields,
  method = 'POST',
  message = 'Product Added Succesully',
  errorMessage = 'Please Check Unique Values',
  mutate = false,
  files = false,
  addResources = false,
}) => {
  const { toast } = useToasts();

  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { cleanObjects } = useCleanObjects();
  const { successResponse, errorResponse } = useResponses({
    error,
    successLabel: message,
  });

  const newValues = (data) => {
    const updateValues = cleanObjects({
      ...data,
    });
    console.log(updateValues);

    return updateValues;
  };

  const successCase = async (res) => {
    setSuccess(res.status === 200);
    setError(false);
    reset && reset();
    setValues && setValues(clearFields);
    mutate && (await mutate());
    toast({
      title: message,
    });
  };

  const errorCase = (error) => {
    setSuccess(false);
    setError(error.message);
    setLoading(false);
    toast({
      title: errorMessage,
      status: 'error',
    });
  };

  const onSubmit = async (data) => {
    console.log(data, 'data');

    const updateValues = newValues(data);

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:1337${path}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateValues),
      });

      const data = await res.json();

      addResources &&
        window.location.replace(`http://localhost:5000/#${path}/${data?.id}`);

      successCase(res);
    } catch (error) {
      errorCase(error);
    }

    setLoading(false);
  };

  const submitValues = {
    loading,
    successResponse,
    errorResponse,
    success,
    error,
  };

  return { onSubmit, submitValues };
};
