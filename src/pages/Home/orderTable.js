import React from 'react';
import { useFetch } from '../../helpers/axios';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import { GET_RECENT_ORDERS } from '../../settings/constant';
import Skeletn from '../../components/skeleton';

const ProductTable = () => {
  const { apiData, loading, error } = useFetch({
    method: 'GET',
    url: GET_RECENT_ORDERS,
  });

  if (loading) {
    return <Skeletn />;
  }

  if (error) {
    return error.message;
  }

  // const result = formatDistanceToNow(new Date(apiData[0].created_at));
  // console.log(result);
  console.log(apiData);

  const columns = apiData.map((item, index) => {
    return item.order_comp.map((order) => {
      const isdiscounted = item.top_level_discount;
      const priceWithQuantity = order.product.sale_price * order.quantity;
      const totalPriceWithShipping = priceWithQuantity + item.shipping;
      const discount =
        isdiscounted &&
        (item.top_level_discount / 100) * totalPriceWithShipping;

      const totalPrice = discount
        ? totalPriceWithShipping - discount
        : totalPriceWithShipping;
      return (
        <Tr key={index}>
          <Td> 100{item.id} </Td>
          <Td> {item.client?.Name ? item.client.Name : item.name} </Td>
          <Td> {order.quantity} </Td>
          <Td> {order.product.product_name} </Td>
          <Td>{priceWithQuantity}</Td>
          <Td>{item.invoice_date}</Td>
          <Td>{item.top_level_discount}%</Td>
          <Td>{item.shipping}</Td>
          <Td>{totalPrice}</Td>
        </Tr>
      );
    });
  });

  return (
    <>
      <Box backgroundColor='white' boxShadow='base' overflowX='auto'>
        <Text
          bg='secondary.200'
          color='secondary.700'
          p={2}
          align='center'
          fontWeight='semibold'
        >
          Recent Orders
        </Text>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Invoice No</Th>
              <Th>Name</Th>
              <Th>Quantity</Th>
              <Th>Product</Th>
              <Th>Order Price</Th>
              <Th>Invoice Date</Th>
              <Th>Discount</Th>
              <Th>Shipping</Th>
              <Th>Total Price</Th>
            </Tr>
          </Thead>
          <Tbody>{columns}</Tbody>
        </Table>
      </Box>
    </>
  );
};

export default ProductTable;
