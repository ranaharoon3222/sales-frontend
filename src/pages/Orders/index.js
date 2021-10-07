import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Badge,
} from '@chakra-ui/react';
import Skeletn from '../../components/skeleton';
import { usePagination } from '../../helpers/usePagination';
import Filters from '../../components/filters';
import qs from 'qs';
import { ORDERS, PAGINATION_LIMIT } from '../../settings/constant';
// import { useHistory } from 'react-router-dom';
import { useDelete } from 'helpers/useSingleDelete';
import { IoTrashOutline } from 'react-icons/io5';

const Products = () => {
  // const history = useHistory();
  const [value, setValue] = useState(undefined);

  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: value },
        { contact_no_contains: value },
        { address_contains: value },
        { id_eq: value },
      ],
    },
  });
  const { apiData, loading, error, Paginations, mutate } = usePagination({
    path: ORDERS,
    filters: `&${query}`,
    limit: PAGINATION_LIMIT,
  });

  const { handleDelete } = useDelete();

  if (loading) {
    return <Skeletn />;
  }
  if (error) {
    return error.message;
  }

  const TableColumns = [
    {
      name: 'Del',
      number: false,
    },
    {
      name: '#Order',
      number: false,
    },
    {
      name: 'Order Product',
      number: false,
    },
    {
      name: 'Contact No',
      number: false,
    },
    {
      name: 'Address',
      number: false,
    },
    {
      name: 'Invoice Date',
      number: true,
    },
    {
      name: 'Shipping',
      number: true,
    },

    {
      name: 'Discount',
      number: true,
    },
    {
      name: 'Total Price',
      number: true,
    },
    {
      name: 'Advance',
      number: true,
    },
    {
      name: 'Client',
      number: false,
    },
    {
      name: 'Status',
      number: false,
    },
  ];

  const columns = apiData.map((item, index) => {
    const {
      id,
      order_comp,
      contact_no,
      address,
      shipping,
      invoice_date,
      top_level_discount,
      client,
      total_price,
      status,
      advance,
    } = item;

    // const pushToSinglePage = () => {
    //   history.push(`${ORDERS}/${id}`);
    // };

    return (
      <Tr key={index} cursor='pointer'>
        <Td
          width='70px'
          onClick={() =>
            handleDelete({
              path: `${ORDERS}/${id}`,
              title: `${item.name} Deleted Successfully`,
              mutate,
            })
          }
        >
          <IoTrashOutline color='red' size='22px' />
        </Td>
        <Td> 100{id} </Td>
        <Td whiteSpace='nowrap'>
          {order_comp.map((order, i) => {
            return (
              <Badge mr={3} key={i}>
                {order.product.product_name} - {order.quantity}
              </Badge>
            );
          })}
        </Td>
        <Td> {contact_no} </Td>
        <Td whiteSpace='nowrap'>{address}</Td>
        <Td isNumeric whiteSpace='nowrap'>
          {invoice_date}
        </Td>
        <Td isNumeric> {shipping} </Td>
        <Td isNumeric> {top_level_discount} </Td>
        <Td isNumeric> {total_price} </Td>
        <Td isNumeric> {advance} </Td>
        <Td> {client?.Name} </Td>
        <Td> {<Badge colorScheme='green'> {status} </Badge>} </Td>
      </Tr>
    );
  });

  return (
    <>
      <Box backgroundColor='white' boxShadow='base' overflowX='auto'>
        <Filters setValue={setValue} value={value} />
        <Table variant='simple'>
          <TableCaption>{Paginations()}</TableCaption>
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
      </Box>
    </>
  );
};

export default Products;
