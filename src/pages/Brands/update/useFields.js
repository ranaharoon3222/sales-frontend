import { useParams } from 'react-router-dom';
import { useFetch } from '../../../helpers/axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schema';
import { BRANDS } from '../../../settings/constant';
import { AllFields } from '../allFields';

export const useFields = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let { id } = useParams();

  const {
    apiData,
    loading,
    error: apiError,
    refetch,
    isValidating,
    mutate,
  } = useFetch(`${BRANDS}/${id}`);

  const { productFields } = AllFields({
    apiData,
  });

  const useFieldOptions = {
    productFields,
    register,
    handleSubmit,
    formError: errors,
    control,
    apiData,
    loading,
    apiError,
    id,
    refetch,
    isValidating,
    mutate,
  };

  return { useFieldOptions };
};
