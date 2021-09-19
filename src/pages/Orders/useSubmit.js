import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from 'pages/Refrence/schema';
import { useImageUpload } from 'pages/Refrence/useImageUpload';
import { useStoreActions } from 'easy-peasy';
import { SubmitObject } from 'helpers/useSubmitValues';

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
