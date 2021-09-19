/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';

// eslint-disable-next-line react/display-name
const RefrenceSelect = React.forwardRef(
  ({ path, label = 'name', ...rest }, ref) => {
    const [value, setValue] = useState('');

    const loadOptions = async () => {
      const url = `http://localhost:1337/${path}?_q=${value}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        return data.map((item) => {
          return {
            value: item.id,
            label: `${item[label]}`,
          };
        });
      } catch (error) {
        console.log(error);
      }
    };

    const handleInputChange = (newValue) => {
      const inputValue = newValue.replace(/\W/g, '');
      setValue(inputValue);
    };

    return (
      <AsyncSelect
        {...rest}
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        onInputChange={handleInputChange}
        ref={ref}
      />
    );
  }
);

export default RefrenceSelect;
