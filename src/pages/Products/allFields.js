import Select from 'components/select/simpleSelect';
import { Controller } from 'react-hook-form';
import AsynSelect from 'pages/Products/refrenceSelect';

const options = [
  { value: 'PCS', label: 'PCS' },
  { value: 'MTR', label: 'MTR' },
  { value: 'DOZ', label: 'DOZ' },
  { value: 'CMS', label: 'CMS' },
];

export const useFields = ({ control, handleChange, apiData }) => {
  const allFields = [
    {
      name: 'item_code',
    },
    {
      name: 'product_name',
    },
    {
      name: 'model_no',
    },
    {
      name: 'print_name',
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
                label: apiData?.brand.name,
                value: apiData?.brand.id,
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
                label: apiData?.unit || 'PCS',
                value: apiData?.unit || 'PCS',
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
    },
  ];

  return { allFields };
};
