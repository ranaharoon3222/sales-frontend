import React from 'react';
import { FormControl, FormLabel, Input, Switch } from '@chakra-ui/react';

const OrderInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  ...rest
}) => {
  return (
    <FormControl
      {...rest}
      style={{ marginBottom: '10px' }}
      display={type === 'switch' ? 'flex' : 'inherit'}
      alignItems='center'
    >
      <FormLabel>{label}</FormLabel>
      {type === 'switch' ? (
        <Switch {...rest} name={name} value={value} onChange={onChange} />
      ) : (
        <Input
          placeholder={label}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          {...rest}
        />
      )}
    </FormControl>
  );
};

export default OrderInput;
