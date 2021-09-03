import React from 'react';
import Select from 'react-select';

const SimpleSelect = React.forwardRef((fields, ref) => {
  return <Select {...fields} defaultOptions innerRef={ref} />;
});

export default SimpleSelect;
