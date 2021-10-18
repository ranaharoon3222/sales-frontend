import React from 'react';
import Input from 'components/input';
import { Button, Box, Select } from '@chakra-ui/react';
import Drawer from 'components/Drawer';
import useInstallments from './useInstallment';

const Installments = ({ isOpen, onClose, item, register }) => {
  const {
    handleAddClick,
    handleInputChange,
    handleRemoveClick,
    installmentsItem,
  } = useInstallments({ item });

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} placement='right'>
        <Input
          label={'Advance'}
          // value={advance}
          // onChange={handleChange}
          {...register('advance')}
          name='advance'
          type='number'
        />
        {installmentsItem?.map((item, i) => {
          return (
            <Box key={i}>
              <Input
                label={'Invoice Date'}
                value={item.invoice}
                onChange={(e) => handleInputChange(e, i)}
                name='invoice'
                type='date'
              />
              <Input
                label={'Price'}
                value={item.price}
                onChange={(e) => handleInputChange(e, i)}
                name='price'
                type='number'
                min='1'
              />

              <Select
                placeholder='Select option'
                value={item.status}
                onChange={(e) => handleInputChange(e, i)}
                name='status'
                my={5}
              >
                <option value='pending'>pending</option>
                <option value='paid'>paid</option>
                <option value='refunded'>refunded</option>
              </Select>

              {installmentsItem.length - 1 === i && (
                <Button mr={4} colorScheme='purple' onClick={handleAddClick}>
                  Add
                </Button>
              )}
              {installmentsItem.length !== 1 && (
                <Button
                  colorScheme='red'
                  className='mr10'
                  onClick={() => handleRemoveClick(i)}
                >
                  Remove
                </Button>
              )}
            </Box>
          );
        })}
      </Drawer>
    </>
  );
};

export default Installments;
