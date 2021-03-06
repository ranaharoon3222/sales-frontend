import React from 'react';
import AsyncSelect from 'react-select/async';

const Index = (path, label = 'name') => {
  const loadOptions = async (inputValue) => {
    const url = `http://localhost:1337/${path}?_q=${inputValue}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data.map((item) => {
        return {
          value: item.id,
          label: item?.brand
            ? `${item[label]} - ${item.brand.name} `
            : item[label],
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const SelectComponent = React.forwardRef((fields, ref) => {
    return (
      <AsyncSelect
        {...fields}
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        ref={ref}
      />
    );
  });

  return { SelectComponent };
};

export default Index;
