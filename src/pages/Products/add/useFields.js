import { useState, useEffect } from 'react';
import SimpleSelect from '../../../components/select/simpleSelect';
import useSelect from '../../../components/select';
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
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

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
      return { ...prev, stock_value: purchase_price * stock };
    });
  }, [purchase_price, stock]);

  const { SelectComponent, selectValue } = useSelect('brands');

  const productFields = [
    {
      name: 'item_code',
    },
    {
      name: 'product_name',
      value: product_name,
      custom: true,
    },
    {
      name: 'model_no',
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
          render={({ field }) => <SelectComponent {...field} />}
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
    },
    {
      name: 'unit',
      component: (
        <Controller
          name='unit'
          control={control}
          render={({ field }) => <SimpleSelect options={options} {...field} />}
        />
      ),
    },
    {
      name: 'opening_stock',

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
    selectValue,
    SelectComponent,
    register,
    handleSubmit,
    formError: errors,
    control,
    handleChange,
    reset,
    setSvalue,
    sValue,
  };

  return { useFieldOptions };
};
