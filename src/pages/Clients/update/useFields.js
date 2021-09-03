import { useState } from 'react';
import useSelect from '../../../components/select';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../../helpers/axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schema';
import { CLIENTS } from '../../../settings/constant';
import { AllFields } from '../allFields';
import axios from 'axios';

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
  const [image, setImage] = useState(undefined);
  const [cnic_image, setCnicImage] = useState(undefined);

  const handleChange = async (e) => {
    const Formdata = new FormData();
    Formdata.append('files', e.target.files[0]);
    const file = await axios.request({
      url: '/upload',
      method: 'POST',
      data: Formdata,
    });
    if (e.target.name === 'image') {
      file.status === 200 && setImage(file.data?.[0].id);
    } else if (e.target.name === 'cnic_image') {
      file.status === 200 && setCnicImage(file.data?.[0].id);
    }
  };

  const {
    apiData,
    loading,
    error: apiError,
  } = useFetch({
    method: 'GET',
    url: `${CLIENTS}/${id}`,
  });

  const { SelectComponent, selectValue } = useSelect('brands');

  const { productFields } = AllFields({
    control,
    apiData,
    handleChange,
    image,
  });

  const useFieldOptions = {
    productFields,
    selectValue,
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
  };

  return { useFieldOptions };
};
