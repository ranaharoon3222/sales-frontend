import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from 'pages/Profile/schema';
import { useStoreActions } from 'easy-peasy';
import { SubmitObject } from 'helpers/useSubmitValues';

export const useSubmit = ({
  path,
  method = 'POST',
  message = 'Profile Added Succesully',
  errorMessage = 'Please Check Unique Values',
  mutate = false,
  redirect = false,
  id = false,
}) => {
  const saveProfile = useStoreActions((actions) => actions.Profile.save);
  const updateProfile = useStoreActions((actions) => actions.Profile.update);

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
    const updateValues = cleanObjects({
      ...data,
    });
    console.log(updateValues);

    return updateValues;
  };

  const onSubmit = (data) => {
    setLoading(true);
    const updateValues = newValues(data);

    if (method === 'POST') {
      saveProfile(updateValues)
        .then(() => {
          successCase();
          redirect && history.push(path);
        })
        .catch((err) => errorCase(err));
    } else {
      updateProfile({ updateValues, id })
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
