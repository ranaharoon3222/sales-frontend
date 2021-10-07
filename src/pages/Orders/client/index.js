import React from 'react';
import ClientSelect from './ClientSelect';
import UseDrawer from 'components/Drawer';
import CustomInput from 'components/input';
import { Controller } from 'react-hook-form';
import { useDisclosure, Button, Box, Text } from '@chakra-ui/react';

const Index = ({ submitValues }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { control, register } = submitValues;

  return (
    <div>
      <Box d='flex' justifyContent='flex-end' py={3}>
        <Button onClick={onOpen} colorScheme='purple'>
          Add CLient
        </Button>
      </Box>
      <UseDrawer placement='right' isOpen={isOpen} onClose={onClose}>
        <Box pb={4}>
          <Text pb={2} fontWeight='semibold'>
            Select Client
          </Text>
          <Controller
            name='client'
            control={control}
            render={({ field }) => <ClientSelect path='clients' {...field} />}
          />
        </Box>
        <CustomInput label={'Client Name'} {...register('name')} />
        <CustomInput label={'Contact No'} {...register('contact_no')} />
        <CustomInput label={'Address'} {...register('address')} />
      </UseDrawer>
    </div>
  );
};

export default Index;
