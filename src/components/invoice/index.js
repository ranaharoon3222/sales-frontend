import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

const Index = React.forwardRef(({ order, profile }, ref) => {
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
      name: 'Brand',
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

  const [brand, setBrand] = useState([]);

  useEffect(() => {
    axios
      .get(`/brands`)
      .then((item) => {
        return setBrand(item.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = order.order_comp.map((item, index) => {
    const { quantity, product, sale_price, total_price } = item;

    const brandName = brand.filter((item) => item.id === product.brand);

    return (
      <Tr key={item.id} borderBottomWidth='1px' borderColor='gray.100'>
        <Td> {product.product_name} </Td>
        <Td> {brandName?.[0]?.name} </Td>
        <Td isNumeric> {quantity} </Td>
        <Td isNumeric> R.s {sale_price} </Td>
        <Td isNumeric>R.s {total_price} </Td>
      </Tr>
    );
  });
  const company = profile?.name;
  const address = profile?.address;
  const remarks = profile?.remarks;
  const mobile = profile?.mobile;

  return (
    <Box ref={ref} py={5} px={5}>
      <Heading
        size='xl'
        color='gray.400'
        fontWeight='light'
        textAlign='center'
        mb={2}
      >
        {company}
      </Heading>
      <Text textAlign='center' fontSize='sm' mb={2}>
        {address}
      </Text>
      <Text textAlign='center' fontSize='sm' mb={2}>
        {mobile}
      </Text>
      <SimpleGrid columns={2}>
        <Box>
          <Text textAlign='left' fontSize='base' mb={2}>
            <b>Name:</b> {order.name || order?.client?.Name}
          </Text>
          <Text textAlign='left' fontSize='base' mb={2}>
            <b>Address: </b> {order.address || order?.client?.permanent_address}
          </Text>
          <Text textAlign='left' fontSize='base' mb={2}>
            <b> Contact No:</b> {order.contact_no || order?.client?.mobile_no}
          </Text>
        </Box>
        <Box>
          <Text fontFamily='monospace' textAlign='right' fontSize='xl' mb={2}>
            Invoice #{order.id}
          </Text>
        </Box>
      </SimpleGrid>

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
      <Text textAlign='center' fontSize='sm' mb={2} mt={6}>
        {remarks}
      </Text>
    </Box>
  );
});

export default Index;
