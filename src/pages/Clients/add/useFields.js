import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schema';
import { AllFields } from '../allFields';
import { useImageUpload } from '../../../helpers/useImageUpload';

export const useFields = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { handleChange, cnic_image, image } = useImageUpload();

  const { productFields } = AllFields({ control, handleChange: handleChange });

  const useFieldOptions = {
    productFields,
    register,
    handleSubmit,
    formError: errors,
    control,
    reset,
    image,
    cnic_image,
  };

  return { useFieldOptions };
};
