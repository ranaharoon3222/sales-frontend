import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'PCS', label: 'PCS' },
  { value: 'MTR', label: 'MTR' },
  { value: 'DOZ', label: 'DOZ' },
  { value: 'CMS', label: 'CMS' },
];

const SimpleSelect = ({ handleChange }) => {
  return <Select options={options} onChange={handleChange} />;
};

export default SimpleSelect;
