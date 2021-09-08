import useSelect from '../../../components/select';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../../helpers/axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schema';
import { CLIENTS } from '../../../settings/constant';
import { AllFields } from '../allFields';
import { useImageUpload } from '../../../helpers/useImageUpload';

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
  const { handleChange, cnic_image, image } = useImageUpload();

  const {
    apiData,
    loading,
    error: apiError,
    mutate,
  } = useFetch(`${CLIENTS}/${id}`);

  const { SelectComponent } = useSelect('brands');

  const { productFields } = AllFields({
    control,
    apiData,
    handleChange,
  });

  const useFieldOptions = {
    productFields,
    SelectComponent,
    register,
    handleSubmit,
    formError: errors,
    control,
    apiData,
    loading,
    apiError,
    id,
    image,
    cnic_image,
    mutate,
  };

  return { useFieldOptions };
};
