import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';

const Index = (path, label = 'name') => {
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const handleChangeSelect = (value) => {
    setSelectedValue(value);
  };

  const loadOptions = async () => {
    const url = `http://localhost:1337/${path}?_q=${search}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data.map((brand) => {
        return { value: brand.id, label: brand[label] };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const selectComponent = () => {
    return (
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        onInputChange={handleSearchChange}
        defaultOptions
        value={selectedValue}
        onChange={handleChangeSelect}
      />
    );
  };

  const selectValue = selectedValue.value;
  return { selectComponent, selectValue };
};

export default Index;
