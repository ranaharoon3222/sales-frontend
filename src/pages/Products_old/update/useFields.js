import { useState, useEffect } from 'react';
import SimpleSelect from '../../../components/select/simpleSelect';
import useSelect from '../../../components/select';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../../helpers/axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schema';

const options = [
  { value: 'PCS', label: 'PCS' },
  { value: 'MTR', label: 'MTR' },
  { value: 'DOZ', label: 'DOZ' },
  { value: 'CMS', label: 'CMS' },
];

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

  const { apiData, loading, error: apiError } = useFetch(`/products/${id}`);

  const [sValue, setSvalue] = useState({
    purchase_price: '',
    stock_value: '',
    stock: '',
    print_name: '',
    product_name: '',
  });

  const { purchase_price, stock_value, stock, print_name, product_name } =
    sValue;

  const handleChange = (e) => {
    setSvalue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
        print_name:
          e.target.name === 'print_name' || e.target.name === 'product_name'
            ? e.target.value
            : print_name,
      };
    });
  };

  useEffect(() => {
    setSvalue((prev) => {
      return {
        ...prev,
        stock_value: purchase_price * stock,
      };
    });
  }, [purchase_price, stock]);

  useEffect(() => {
    setSvalue((prev) => {
      return {
        ...prev,
        purchase_price: apiData?.purchase_price || '',
        stock: apiData?.stock || '',
        print_name: apiData?.print_name || '',
        product_name: apiData?.product_name || '',
      };
    });
  }, [apiData]);

  const { SelectComponent } = useSelect('brands');

  const productFields = [
    {
      name: 'item_code',
      defaultValue: apiData?.item_code,
    },
    {
      name: 'product_name',
      value: product_name,
      custom: true,
    },
    {
      name: 'model_no',
      defaultValue: apiData?.model_no,
    },
    {
      name: 'print_name',
      value: print_name,
      custom: true,
    },
    {
      name: 'brand',
      component: (
        <Controller
          name='brand'
          control={control}
          render={({ field }) => (
            <SelectComponent
              defaultValue={{
                label: apiData?.brand?.name || '',
                value: apiData?.brand?.name || '',
              }}
              {...field}
            />
          )}
        />
      ),
    },
    {
      name: 'purchase_price',
      type: 'number',
      value: purchase_price,
      custom: true,
    },
    {
      name: 'sale_price',
      type: 'number',
      defaultValue: apiData?.sale_price,
    },
    {
      name: 'unit',
      component: (
        <Controller
          name='unit'
          control={control}
          render={({ field }) => (
            <SimpleSelect
              defaultValue={{
                label: apiData?.unit || '',
                value: apiData?.unit || '',
              }}
              options={options}
              {...field}
            />
          )}
        />
      ),
    },
    {
      name: 'opening_stock',
      defaultValue: apiData?.opening_stock,
      type: 'number',
    },
    {
      name: 'stock',
      value: stock,
      custom: true,
      type: 'number',
    },
    {
      name: 'stock_value',
      value: stock_value,
      type: 'number',
      custom: true,
      disabled: true,
    },
  ];

  const useFieldOptions = {
    productFields,
    SelectComponent,
    register,
    handleSubmit,
    formError: errors,
    control,
    handleChange,
    apiData,
    loading,
    apiError,
    id,
    sValue,
  };

  return { useFieldOptions };
};
