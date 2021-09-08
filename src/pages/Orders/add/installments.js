import React from 'react';
import OrderInput from './OrderInput';
import {
  useDisclosure,
  Button,
  Box,
  Select,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { OrderDrawer } from './useDrawer';

const Installments = ({
  handleAddClick,
  handleInputChange,
  handleRemoveClick,
  installmentsItem,
  advance,
  handleChange,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme='purple'>
        Add Installments
      </Button>
      <SimpleGrid columns={3} spacingX={1} spacingY={0} mt={3}>
        {installmentsItem?.map((item, i) => {
          return (
            <Box my={2} bg='gray.200' p={4} key={i + item.invoice}>
              <Text fontWeight='semibold' mb={2}>
                {item.invoice}
                <br />
                {item.price}
                <br />
                {item.status}
              </Text>
            </Box>
          );
        })}
      </SimpleGrid>

      <OrderDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <OrderInput
          label={'Advance'}
          value={advance}
          onChange={handleChange}
          name='advance'
          type='number'
        />
        {installmentsItem?.map((item, i) => {
          return (
            <Box key={i}>
              <OrderInput
                label={'Invoice Date'}
                value={item.invoice}
                onChange={(e) => handleInputChange(e, i)}
                name='invoice'
                type='date'
              />
              <OrderInput
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
      </OrderDrawer>
    </>
  );
};

export default Installments;
