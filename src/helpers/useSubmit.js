import { useState } from 'react';
import { useCleanObjects } from './useCleanObjects';
import { useResponses } from './useResponses';
import { useToasts } from './useToast';
import { useHistory } from 'react-router-dom';

export const useSubmit = ({
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

  const history = useHistory();

  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { cleanObjects } = useCleanObjects();
  const { successResponse, errorResponse } = useResponses({
    error,
    successLabel: message,
  });

  const newValues = (data) => {
    let refrences = [];
    const isRefrences = data?.refrences;
    isRefrences?.forEach((item) => {
      return refrences.push({ id: item.value });
    });

    const brand = data?.brand?.value;
    const unit = data?.unit?.value;
    const house_occupation = data?.house_occupation?.value;
    const stateValues = values ? values : {};
    const image = files.image ? { image: files.image } : {};
    const cnic_image = files.cnic_image ? { cnic_image: files.cnic_image } : {};
    const updateValues = cleanObjects({
      ...data,
      ...stateValues,
      ...image,
      ...cnic_image,
      ...refrences,
      house_occupation,
      brand,
      unit,
    });
    console.log(updateValues);

    return updateValues;
  };

  const successCase = async (res) => {
    setSuccess(res.status === 200);
    setError(false);
    // reset && reset();
    // setValues && setValues(clearFields);
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
    console.log(updateValues);
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

      addResources && res.ok && history.push(path);

      res.ok ? successCase(res) : errorCase('Something Went Wrong');
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
