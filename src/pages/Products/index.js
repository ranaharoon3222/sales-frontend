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
} from '@chakra-ui/react';
import Skeletn from 'components/skeleton';
import { usePagination } from 'helpers/usePagination';
import Filters from 'components/filters';
import qs from 'qs';
import { PRODUCTS, PAGINATION_LIMIT } from 'settings/constant';
import { useHistory } from 'react-router-dom';
import { useDelete } from 'helpers/useSingleDelete';
import { IoTrashOutline } from 'react-icons/io5';

const Products = () => {
  const history = useHistory();
  const [value, setValue] = useState('');

  const query = qs.stringify({
    _where: {
      _or: [{ item_code_contains: value }, { product_name_contains: value }],
    },
  });
  const { apiData, loading, error, Paginations, mutate } = usePagination({
    path: PRODUCTS,
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
      name: 'item_code',
      number: true,
    },

    {
      name: 'product_name',
      number: false,
    },
    {
      name: 'sale_price',
      number: true,
    },

    {
      name: 'unit',
      number: false,
    },
    {
      name: 'stock',
      number: true,
    },
  ];

  const columns = apiData.map((item) => {
    const { item_code, product_name, unit, stock, sale_price, id } = item;

    const pushToSinglePage = () => {
      history.push(`${PRODUCTS}/${id}`);
    };

    return (
      <Tr key={item.id} cursor='pointer'>
        <Td
          width='70px'
          onClick={() =>
            handleDelete({
              path: `${PRODUCTS}/${id}`,
              title: `${item.product_name} Deleted Successfully`,
              mutate,
            })
          }
        >
          <IoTrashOutline color='red' size='22px' />
        </Td>
        <Td onClick={pushToSinglePage} isNumeric>
          {item_code}
        </Td>
        <Td> {product_name} </Td>
        <Td isNumeric> {sale_price} </Td>
        <Td> {unit} </Td>
        <Td isNumeric> {stock} </Td>
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
