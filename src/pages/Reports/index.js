import React from 'react';
import { useDateRange } from 'components/DateRange';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Badge,
} from '@chakra-ui/react';
import { generateKey } from 'helpers/useUnique';
import Skeleton from 'components/skeleton';
import GetSumValues from 'pages/Reports/getSums';

const Index = () => {
  const { loading, DateComponent, apiData } = useDateRange();

  const columns = apiData?.map((item, index) => {
    const totalPrice = item.total_price;
    const date = new Date(item.created_at);

    var options = {
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
    };

    return (
      <Tr key={generateKey(item.id)}>
        <Td> 100{item.id} </Td>
        <Td>
          {item.order_comp.map((order, i) => {
            return (
              <Badge mr={3} key={i}>
                {order.product.product_name} - {order.quantity}
              </Badge>
            );
          })}
        </Td>
        <Td>{date.toLocaleDateString('en', options)}</Td>
        <Td>{totalPrice}</Td>
      </Tr>
    );
  });

  return (
    <div>
      {DateComponent()}

      {loading ? (
        <Skeleton />
      ) : (
        <>
          <GetSumValues apiData={apiData} />
          <Box backgroundColor='white' boxShadow='base' overflowX='auto'>
            <Text
              bg='secondary.200'
              color='secondary.700'
              p={2}
              align='center'
              fontWeight='semibold'
            >
              Orders History
            </Text>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Invoice No</Th>
                  <Th>Products</Th>
                  <Th>Invoice Date</Th>
                  <Th>Total Price</Th>
                </Tr>
              </Thead>
              <Tbody>{columns}</Tbody>
            </Table>
          </Box>
        </>
      )}
    </div>
  );
};

export default Index;
