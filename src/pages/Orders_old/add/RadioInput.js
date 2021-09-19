import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';

const OrderInput = ({ label, name, value, setRadio, ...rest }) => {
  return (
    <FormControl {...rest} style={{ marginBottom: '10px' }}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup onChange={setRadio} value={value}>
        <Stack direction='row'>
          <Radio value='client_ac'>Client Account</Radio>
          <Radio value='cash_ac'>Cash Account</Radio>
        </Stack>
      </RadioGroup>
    </FormControl>
  );
};

export default OrderInput;
