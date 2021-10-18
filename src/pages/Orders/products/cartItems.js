import React, { useEffect } from 'react';
import { Grid, GridItem, Text, useDisclosure } from '@chakra-ui/react';
import Input from 'components/input';
import { IoTrashOutline } from 'react-icons/io5';
import Installments from './installments';
import { useStoreActions } from 'easy-peasy';
import Popover from './poprover';

const CartItems = ({ register, item, index, remove, field, setValue }) => {
  const deleteCart = useStoreActions((actions) => actions.Orders.deleteCart);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const discountValue = (field.discount / 100) * field.sale_price;
  const quantity = field.quantity;
  const total_price = (field.sale_price - discountValue) * quantity;

  useEffect(() => {
    setValue(`order_comp.${index}.total_price`, Math.round(total_price));
  }, [index, setValue, total_price]);

  return (
    <>
      <Installments
        register={register}
        isOpen={isOpen}
        onClose={onClose}
        item={item[index]}
      />

      <Grid
        templateColumns='repeat(8, 1fr)'
        gap={2}
        pb={2}
        alignItems='center'
        borderBottom='1px'
        borderColor='blackAlpha.300'
      >
        <GridItem colSpan={1}>
          <IoTrashOutline
            color='red'
            onClick={() => {
              remove(index);
              deleteCart({ id: item[index]?.id });
            }}
          />
        </GridItem>
        <GridItem colSpan={3}>
          <Text fontSize='sm'>{item[index]?.product_name} </Text>
          <Text fontSize='xs' color='Highlight' onClick={onOpen}>
            Add Installment
          </Text>
        </GridItem>
        <GridItem colSpan={2}>
          <Input
            name='quantity'
            {...register(`order_comp.${index}.quantity`)}
            type='number'
            defaultValue='1'
            min='1'
            max={item[index].stock}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Text fontWeight='semibold' textAlign='right'>
            {field.total_price} R.s
          </Text>

          <Popover
            trigger={
              <Text
                fontSize='xs'
                textAlign='right'
                color='Highlight'
                cursor='pointer'
              >
                Add Discount
              </Text>
            }
            title='Add Discount'
          >
            <Input
              color='black'
              name='discount'
              {...register(`order_comp.${index}.discount`)}
              type='number'
              placeholder='Add Discount'
            />
          </Popover>
        </GridItem>
      </Grid>
    </>
  );
};

export default CartItems;
