import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react';

const Index = React.forwardRef(({ order }, ref) => {
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

  const TableColumns = [
    {
      name: 'Product',
      number: false,
    },
    {
      name: 'Qty',
      number: true,
    },
    {
      name: 'Unit Price',
      number: true,
    },
    {
      name: 'Total',
      number: true,
    },
  ];

  const columns = order.order_comp.map((item, index) => {
    const { quantity, product, sale_price, total_price } = item;

    return (
      <Tr key={item.id} borderBottomWidth='1px' borderColor='gray.100'>
        <Td> {product.product_name} </Td>
        <Td isNumeric> {quantity} </Td>
        <Td isNumeric> R.s {sale_price} </Td>
        <Td isNumeric>R.s {total_price} </Td>
      </Tr>
    );
  });

  return (
    <Box ref={ref} py={5} px={5}>
      <Heading
        size='xl'
        color='gray.400'
        fontWeight='light'
        textAlign='center'
        mb={2}
      >
        RECEIPT
      </Heading>
      <Text fontFamily='monospace' textAlign='center' fontSize='xl' mb={2}>
        #{order.id}
      </Text>
      <Box backgroundColor='white' overflowX='auto'>
        <Table variant='simple' mb={4}>
          <Thead
            borderTopWidth='2px'
            borderBottomWidth='2px'
            borderColor='gray.200'
          >
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
    </Box>
  );
});

export default Index;
