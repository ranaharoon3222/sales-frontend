import useSelect from '../../../components/select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schema';
import { AllFields } from '../allFields';

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

  const { SelectComponent, selectValue } = useSelect('brands');

  const { productFields } = AllFields({ control });

  const useFieldOptions = {
    productFields,
    selectValue,
    SelectComponent,
    register,
    handleSubmit,
    formError: errors,
    control,
    reset,
  };

  return { useFieldOptions };
};
