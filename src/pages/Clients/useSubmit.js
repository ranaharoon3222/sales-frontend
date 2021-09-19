import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from 'pages/Clients/schema';
import { useImageUpload } from 'pages/Clients/useImageUpload';
import { useStoreActions } from 'easy-peasy';
import { SubmitObject } from 'helpers/useSubmitValues';

export const useSubmit = ({
  path,
  method = 'POST',
  message = 'Client Added Succesully',
  errorMessage = 'Please Check Unique Values',
  mutate = false,
  redirect = false,
  id = false,
}) => {
  const saveClient = useStoreActions((actions) => actions.Clients.save);
  const updateClient = useStoreActions((actions) => actions.Clients.update);

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

  const { handleChange, cnic_image, image } = useImageUpload();

  const newValues = (data) => {
    const house_occupation = data?.house_occupation?.value;
    let refrences = [];
    data?.refrences?.forEach((item) => {
      refrences.push({ id: item.value });
    });

    const updateValues = cleanObjects({
      ...data,
      refrences: refrences,
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
      saveClient(updateValues)
        .then(() => {
          successCase();
          redirect && history.push(path);
        })
        .catch((err) => errorCase(err));
    } else {
      updateClient({ updateValues, id })
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
