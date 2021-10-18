import React, { useRef, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Heading,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useReactToPrint } from 'react-to-print';
import Invoice from 'components/invoice';

const Receipt = ({ watchShipping }) => {
  const order = useStoreState((state) => state.Orders.list);
  const profile = useStoreState((state) => state.Profile.list);
  const loadProfile = useStoreActions((action) => action.Profile.load);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const grandDiscount = order.order_comp.reduce((acc, current) => {
    const discountValue = (current.discount / 100) * current.sale_price;
    return acc + discountValue * current.quantity;
  }, 0);

  const Total = order.order_comp.reduce((acc, current) => {
    return acc + current.sale_price;
  }, 0);

  const grandTotal = order.order_comp.reduce((acc, current) => {
    return acc + current.total_price;
  }, 0);

  const footerValues = [
    {
      name: 'Shipping',
      value: order?.shipping,
    },
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
      value: grandTotal + order?.shipping,
    },
  ];

  const TableColumns = [
    {
      name: 'Product',
      number: false,
    },
    {
      name: 'Qty',
      number: false,
    },

    {
      name: 'Total',
      number: false,
    },
  ];

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const columns = order.order_comp.map((item, index) => {
    const { quantity, product, total_price } = item;

    return (
      <Tr key={item.id}>
        <Td> {product.product_name} </Td>
        <Td> {quantity} </Td>
        <Td>R.s {total_price} </Td>
      </Tr>
    );
  });

  return (
    <>
      <Heading
        size='xl'
        color='gray.400'
        fontWeight='light'
        textAlign='center'
        mb={2}
      >
        {profile?.[0]?.name}
      </Heading>
      <Text fontFamily='monospace' textAlign='center' fontSize='xl' mb={2}>
        #{order.id}
      </Text>
      <Box backgroundColor='white' boxShadow='base' overflowX='auto'>
        <Table variant='simple' mb={4}>
          <Thead>
            <Tr>
              {TableColumns.map((item, index) => {
                return (
                  <Th key={index} isNumeric={item.number}>
                    {item.name}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>{columns}</Tbody>
        </Table>
        {footerValues.map((item, index) => {
          const isGrand = item.name === 'Grand Total';
          return (
            <SimpleGrid
              key={item.name}
              columns={2}
              borderBottom='1px'
              borderColor='blackAlpha.100'
              pb={2}
              pt={1}
              px={5}
            >
              <Text
                fontWeight={isGrand ? 'bold' : 'base'}
                fontSize={isGrand ? 'xl' : 'base'}
                textAlign='right'
              >
                {item.name}
              </Text>
              <Text
                textAlign='right'
                fontWeight='bold'
                fontSize={isGrand ? 'xl' : 'base'}
              >
                R.s {item.value}
              </Text>
            </SimpleGrid>
          );
        })}
      </Box>
      <div style={{ display: 'none' }}>
        <Invoice ref={componentRef} order={order} profile={profile[0]} />
      </div>
      <Button
        colorScheme='purple'
        isFullWidth
        my={4}
        borderRadius='full'
        onClick={handlePrint}
      >
        Print Receipt
      </Button>
    </>
  );
};

export default Receipt;
