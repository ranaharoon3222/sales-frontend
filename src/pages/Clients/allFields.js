import React from 'react';
import SimpleSelect from '../../components/select/simpleSelect';
import { Controller } from 'react-hook-form';
import useSelect from '../../components/select';
import { useArrayValues } from '../../helpers/useArrayValues';
import { useCheckData } from '../../helpers/useCheckData';

const options = [
  { value: 'rent', label: 'rent' },
  { value: 'own', label: 'own' },
];

export const AllFields = ({ control, apiData, handleChange }) => {
  const { SelectComponent } = useSelect('refrences');
  const { arrayValues: refrences } = useArrayValues({
    apiData,
    appiId: 'refrences',
  });
  const { checkData } = useCheckData({ apiData });

  const productFields = [
    {
      name: 'cnic',
      defaultValue: checkData('cnic'),
    },
    {
      name: 'Name',
      defaultValue: checkData('Name'),
    },
    {
      name: 'guardian_name',
      defaultValue: checkData('guardian_name'),
    },
    {
      name: 'age',
      type: 'number',
      defaultValue: checkData('age'),
    },
    {
      name: 'occupation',
      defaultValue: checkData('occupation'),
    },
    {
      name: 'designation',
      defaultValue: checkData('designation'),
    },
    {
      name: 'monthly_income',
      defaultValue: checkData('monthly_income'),
    },
    {
      name: 'permanent_address',
      defaultValue: checkData('permanent_address'),
    },
    {
      name: 'prefered_address',
      defaultValue: checkData('prefered_address'),
    },
    {
      name: 'work_place',
      defaultValue: checkData('work_place'),
    },
    {
      name: 'house_occupation',
      component: (
        <Controller
          name='house_occupation'
          control={control}
          render={({ field }) => (
            <SimpleSelect
              defaultValue={{
                label: checkData('house_occupation'),
                value: checkData('house_occupation'),
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
      name: 'mobile_no',
      defaultValue: checkData('mobile_no'),
    },
    {
      name: 'office_phone',
      defaultValue: checkData('office_phone'),
    },

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
      name: 'refrences',
      component: (
        <Controller
          name='refrences'
          control={control}
          render={({ field }) => (
            <SelectComponent
              isMulti={true}
              defaultValue={refrences}
              {...field}
            />
          )}
        />
      ),
    },
  ];

  return { productFields };
};
