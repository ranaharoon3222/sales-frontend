import React, { useEffect } from 'react';
import Select from 'components/select/simpleSelect';
import { Controller } from 'react-hook-form';
import AsynSelect from 'pages/Products/refrenceSelect';

const options = [
  { value: 'PCS', label: 'PCS' },
  { value: 'MTR', label: 'MTR' },
  { value: 'DOZ', label: 'DOZ' },
  { value: 'CMS', label: 'CMS' },
];

export const useFields = ({
  submitValues: { control, setValue, watch, reset },
  apiData,
}) => {
  useEffect(() => {
    reset({
      print_name: apiData?.print_name,
      product_name: apiData?.product_name,
      stock_value: apiData?.stock_value,
    });
  }, [apiData, reset]);

  // for product

  const product_value = watch('product_name');
  const printValue = watch('print_name');
  const purchase_price = watch('purchase_price');
  const stock = watch('stock');
  const stockValue = watch('stock_value');

  const handleChange = (e) => {
    if (e.target.name === 'product_name') {
      setValue(e.target.name, e.target.value);
      setValue('print_name', e.target.value);
    } else {
      setValue('print_name', e.target.value);
    }
  };

  // for product

  useEffect(() => {
    setValue('stock_value', purchase_price * stock);
  }, [setValue, purchase_price, stock]);

  const allFields = [
    {
      name: 'item_code',
    },
    {
      name: 'product_name',
      custom: true,
      onChange: handleChange,
      value: product_value,
    },
    {
      name: 'model_no',
    },
    {
      name: 'print_name',
      custom: true,
      onChange: handleChange,
      value: printValue,
    },
    {
      name: 'brand',

      component: (
        <Controller
          name='brand'
          control={control}
          render={({ field }) => (
            <AsynSelect
              path='brands'
              defaultValue={{
                label: apiData?.brand?.name,
                value: apiData?.brand?.id || '',
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
          render={({ field }) => (
            <Select
              options={options}
              defaultValue={{
                label: apiData?.unit || '',
                value: apiData?.unit || '',
              }}
              {...field}
            />
          )}
        />
      ),
    },
    {
      name: 'opening_stock',

      type: 'number',
    },
    {
      name: 'stock',

      type: 'number',
    },
    {
      name: 'stock_value',
      type: 'number',
      disabled: true,
      custom: true,
      value: stockValue,
    },
  ];

  return { allFields };
};
