import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Switch,
  FormHelperText,
} from '@chakra-ui/react';

const CustomInput = React.forwardRef(
  ({ label, type = 'text', error, ...rest }, ref) => {
    return (
      <FormControl
        style={{ marginBottom: '10px' }}
        display={type === 'switch' ? 'flex' : 'inherit'}
        alignItems='center'
        ref={ref}
      >
        <FormLabel>{label}</FormLabel>
        {type === 'switch' ? (
          <Switch {...rest} />
        ) : (
          <Input bg='white' placeholder={label} type={type} {...rest} />
        )}
        <FormHelperText> {error} </FormHelperText>
      </FormControl>
    );
  }
);

export default CustomInput;
