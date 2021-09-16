import { useState } from 'react';
import { useCleanObjects } from 'helpers/useCleanObjects';
import { useResponses } from 'helpers/useResponses';
import { useToasts } from 'helpers/useToast';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from 'pages/Refrence/schema';
import { useImageUpload } from 'pages/Refrence/useImageUpload';
import { useStoreActions } from 'easy-peasy';

export const useSubmit = ({
  path,
  method = 'POST',
  message = 'Refrence Added Succesully',
  errorMessage = 'Please Check Unique Values',
  mutate = false,
  redirect = false,
  id = false,
}) => {
  const saveRefrence = useStoreActions((actions) => actions.Refrences.save);
  const updateRefrence = useStoreActions((actions) => actions.Refrences.update);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { handleChange, cnic_image, image } = useImageUpload();

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
    const house_occupation = data?.house_occupation?.value;
    const updateValues = cleanObjects({
      ...data,
      image,
      cnic_image,
      house_occupation,
    });
    console.log(updateValues);

    return updateValues;
  };

  const successCase = async () => {
    setLoading(false);
    setSuccess(true);
    setError(false);
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

  const onSubmit = (data) => {
    setLoading(true);
    const updateValues = newValues(data);

    if (method === 'POST') {
      saveRefrence(updateValues)
        .then(() => {
          successCase();
          redirect && history.push(path);
        })
        .catch((err) => errorCase(err));
    } else {
      updateRefrence({ updateValues, id })
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
    handleChange,
  };

  return { onSubmit, submitValues };
};
