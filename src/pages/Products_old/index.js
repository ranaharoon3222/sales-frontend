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
import Skeletn from '../../components/skeleton';
import { usePagination } from '../../helpers/usePagination';
import Filters from '../../components/filters';
import qs from 'qs';
import { useHistory } from 'react-router-dom';
import { PRODUCTS, PAGINATION_LIMIT } from '../../settings/constant';

const Products = () => {
  const [value, setValue] = useState('');
  const history = useHistory();

  const query = qs.stringify({
    _where: {
      _or: [
        { product_name_contains: value },
        { item_code_contains: value },
        { model_no_contains: value },
      ],
    },
  });
  const { apiData, loading, error, Paginations } = usePagination({
    path: PRODUCTS,
    filters: `&${query}`,
    limit: PAGINATION_LIMIT,
  });

  if (loading) {
    return <Skeletn />;
  }
  if (error) {
    return error.message;
  }

  const TableColumns = [
    {
      name: 'Name',
      number: false,
    },

    {
      name: 'Item Code',
      number: true,
    },
    {
      name: 'Model No',
      number: true,
    },

    {
      name: 'Purchase Price',
      number: true,
    },
    {
      name: 'Sale Price',
      number: true,
    },
    {
      name: 'Stock',
      number: true,
    },
    {
      name: 'Opening Stock',
      number: true,
    },
    {
      name: 'Stock Value',
      number: true,
    },
    {
      name: 'Brand',
      number: false,
    },
  ];

  const columns = apiData.map((item, index) => {
    const pushToSinglePage = () => {
      history.push(`${PRODUCTS}/${item.id}`);
    };

    const {
      product_name,
      item_code,
      model_no,
      sale_price,
      purchase_price,
      stock,
      opening_stock,
      stock_value,
      brand,
    } = item;
    return (
      <Tr key={index} onClick={pushToSinglePage} cursor='pointer'>
        <Td>{product_name}</Td>
        <Td isNumeric> {item_code} </Td>
        <Td isNumeric> {model_no} </Td>
        <Td isNumeric> {purchase_price} </Td>
        <Td isNumeric> {sale_price} </Td>
        <Td isNumeric> {stock} </Td>
        <Td isNumeric> {opening_stock} </Td>
        <Td isNumeric> {stock_value} </Td>
        <Td> {brand?.name} </Td>
      </Tr>
    );
  });

  return (
    <>
      <Box backgroundColor='white' boxShadow='base' overflowX='auto'>
        <Filters setValue={setValue} />
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
