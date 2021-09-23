import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  GridItem,
  SimpleGrid,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import Filters from 'components/filters';
import { useStoreActions, useStoreState } from 'easy-peasy';
import CartItems from './cartItems';
import CartHeader from './cartHeader';
import { useFieldArray } from 'react-hook-form';
import CartFooter from './cartFooter';
import Products from './products';
import Modal from 'components/Modal';

const Index = ({ submitValues }) => {
  const { register, control, watch, setValue, success, reset } = submitValues;
  const addToCart = useStoreActions((action) => action.Orders.addCart);
  const cartItems = useStoreState((state) => state.Orders.cart);
  const clearCart = useStoreActions((action) => action.Orders.clearCart);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'order_comp',
  });

  const watchOrderComp = watch('order_comp');

  const [value, setValues] = useState('');

  useEffect(() => {
    if (fields.length <= 0) {
      clearCart();
    }
  }, [fields]);

  useEffect(() => {
    if (success) {
      reset();
      onOpen();
    }
  }, [success]);

  console.log(fields);
  return (
    <>
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        <GridItem colSpan={3} bg='white' shadow='sm' borderRadius='lg'>
          <Filters setValue={setValues} value={value} />
          <Products
            cartItems={cartItems}
            append={append}
            addToCart={addToCart}
            value={value}
          />
        </GridItem>
        <GridItem colSpan={2} bg='white' p={4} shadow='sm' borderRadius='lg'>
          <CartHeader />
          <Box height='500px' overflowY='auto'>
            {fields.map((field, index) => (
              <CartItems
                register={register}
                field={{ ...field, ...watchOrderComp[index] }}
                item={cartItems}
                key={field.id}
                index={index}
                remove={remove}
                setValue={setValue}
              />
            ))}
          </Box>

          <CartFooter watchOrderComp={watchOrderComp} setValue={setValue} />

          <Modal isOpen={isOpen} onClose={onClose}>
            <p>Lorem</p>
          </Modal>
          {console.log(success)}
          <SimpleGrid columns={2} mt={3}>
            <Button colorScheme='red' mr={2}>
              Cancel
            </Button>
            <Button
              colorScheme='purple'
              type='submit'
              disabled={success || fields.length <= 0}
            >
              Pay Now
            </Button>
          </SimpleGrid>
        </GridItem>
      </Grid>
    </>
  );
};

export default Index;
