import { useState } from 'react';
import axios from 'axios';
import { useCleanObjects } from './useCleanObjects';
import { useResponses } from './useResponses';
import { useToasts } from './useToast';

axios.baseURL = 'http://localhost:1337';

export const useSubmit = ({
  setValues = false,
  values = false,
  reset = false,
  path,
  clearFields,
  method = 'POST',
  message = 'Product Added Succesully',
  errorMessage = 'Please Check Unique Values',

  files = false,
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

  const onSubmit = async (data) => {
    console.log(data, 'data');

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
      refrences,
      house_occupation,
      brand,
      unit,
    });
    console.log(updateValues);
    setLoading(true);
    try {
      const res = await axios.request({
        method,
        url: path,
        data: updateValues,
      });
      setSuccess(res.status === 200);
      setError(false);
      reset && reset();
      setValues && setValues(clearFields);

      toast({
        title: message,
      });
    } catch (error) {
      setSuccess(false);
      setError(error.message);
      setLoading(false);
      toast({
        title: errorMessage,
        status: 'error',
      });
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
