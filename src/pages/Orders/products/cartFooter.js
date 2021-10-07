import React, { useEffect } from 'react';
import { SimpleGrid, Text } from '@chakra-ui/layout';

const CartFooter = ({ watchOrderComp, setValue }) => {
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
      name: 'Sub Total',
      value: Math.round(Total),
    },
    {
      name: 'Discount',
      value: Math.round(grandDiscount),
    },
    {
      name: 'Grand Total',
      value: grandTotal,
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
            <Text
              textAlign='right'
              fontWeight='bold'
              fontSize={isGrand ? '2xl' : 'base'}
            >
              R.s {item.value}
            </Text>
          </SimpleGrid>
        );
      })}
    </>
  );
};

export default CartFooter;
