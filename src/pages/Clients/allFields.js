import Select from 'components/select/simpleSelect';
import { Controller } from 'react-hook-form';
import RefrenceSelect from 'pages/Clients/refrenceSelect';

const options = [
  { value: 'rent', label: 'rent' },
  { value: 'own', label: 'own' },
];

export const useFields = ({ control, handleChange, apiData }) => {
  let refrences = [];
  apiData?.refrences?.forEach((item) => {
    refrences.push({
      label: `${item.name} - ${item.guardian_name}`,
      value: item.id,
    });
  });

  const allFields = [
    {
      name: 'image',
      type: 'file',
      onChange: handleChange,
      custom: true,
    },
    {
      name: 'cnic_image',
      type: 'file',
      onChange: handleChange,
      custom: true,
    },
    {
      name: 'cnic',
    },
    {
      name: 'Name',
    },
    {
      name: 'guardian_name',
    },
    {
      name: 'age',
      type: 'number',
    },
    {
      name: 'occupation',
    },
    {
      name: 'designation',
    },
    {
      name: 'monthly_income',
    },
    {
      name: 'permanent_address',
    },
    {
      name: 'prefered_address',
    },
    {
      name: 'work_place',
    },
    {
      name: 'house_occupation',
      component: (
        <Controller
          name='house_occupation'
          control={control}
          render={({ field }) => (
            <Select
              defaultValue={{
                label: apiData?.house_occupation || 'own',
                value: apiData?.house_occupation || 'rent',
              }}
              options={options}
              {...field}
            />
          )}
        />
      ),
      custom: true,
    },
    {
      name: 'refrences',
      component: (
        <Controller
          name='refrences'
          control={control}
          render={({ field }) => (
            <RefrenceSelect
              defaultValue={refrences}
              path='refrences'
              isMulti
              {...field}
            />
          )}
        />
      ),
      custom: true,
    },
    {
      name: 'mobile_no',
    },

    {
      name: 'office_phone',
    },
  ];

  return { allFields };
};
