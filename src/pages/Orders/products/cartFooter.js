import React, { useEffect } from 'react';
import { Box, SimpleGrid, Text, Badge } from '@chakra-ui/layout';
import Popover from './poprover';
import Input from 'components/input';

const CartFooter = ({ watchOrderComp, setValue, register, watchShipping }) => {
  const grandDiscount = watchOrderComp?.reduce((acc, current) => {
    const discountValue = (current.discount / 100) * current.sale_price;
    return acc + discountValue * current.quantity;
  }, 0);

  const Total = watchOrderComp?.reduce((acc, current) => {
    return acc + current.sale_price;
  }, 0);

  const grandTotal = watchOrderComp?.reduce((acc, current) => {
    return acc + current.total_price;
  }, 0);

  useEffect(() => {
    setValue('total_price', grandTotal);
  }, [grandTotal, setValue]);

  const footerValues = [
    {
      name: (
        <>
          <Box as='span'>Shipping </Box>
          <Badge colorScheme='purple'>{watchShipping}</Badge>
        </>
      ),
      value: (
        <Popover
          trigger={
            <Text
              fontSize='xs'
              textAlign='right'
              color='Highlight'
              cursor='pointer'
            >
              Add Shipping
            </Text>
          }
        >
          <Input
            color='black'
            name='shipping'
            {...register('shipping')}
            type='number'
            placeholder='Add Shipping'
            defaultValue={0}
          />
        </Popover>
      ),
    },
    {
      name: 'Sub Total',
      value: 'R.s ' + Math.round(Total),
    },
    {
      name: 'Discount',
      value: 'R.s -' + Math.round(grandDiscount),
    },
    {
      name: 'Grand Total',
      value: 'R.s ' + (grandTotal + Number(watchShipping)),
    },
  ];
  return (
    <>
      {footerValues.map((item, index) => {
        const isGrand = item.name === 'Grand Total';
        return (
          <SimpleGrid
            key={item.name}
            columns={2}
            borderBottom='1px'
            borderColor='blackAlpha.100'
            pb={2}
            pt={2}
          >
            <Text
              fontWeight={isGrand ? 'bold' : 'base'}
              fontSize={isGrand ? '2xl' : 'base'}
            >
              {item.name}
            </Text>
            <Box
              as={'div'}
              textAlign='right'
              fontWeight='bold'
              fontSize={isGrand ? '2xl' : 'base'}
            >
              {item.value}
            </Box>
          </SimpleGrid>
        );
      })}
    </>
  );
};

export default CartFooter;
