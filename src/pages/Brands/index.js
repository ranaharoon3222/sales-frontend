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
import { BRANDS, PAGINATION_LIMIT } from '../../settings/constant';
import { useHistory } from 'react-router-dom';

const Products = () => {
  const history = useHistory();
  const [value, setValue] = useState('');

  const query = qs.stringify({
    _where: {
      _or: [{ name_contains: value }],
    },
  });
  const { apiData, loading, error, Paginations, isValidating } = usePagination({
    path: BRANDS,
    filters: `&${query}`,
    limit: PAGINATION_LIMIT,
  });

  if (loading && isValidating) {
    return <Skeletn />;
  }
  if (error) {
    return <h1> {error.message} </h1>;
  }

  const TableColumns = [
    {
      name: 'name',
      number: false,
    },

    {
      name: 'description',
      number: false,
    },
  ];

  const columns = apiData.map((item, index) => {
    const { name, id, description } = item;

    const pushToSinglePage = () => {
      history.push(`${BRANDS}/${id}`);
    };

    return (
      <Tr key={index} onClick={pushToSinglePage} cursor='pointer'>
        <Td> {name} </Td>
        <Td> {description} </Td>
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
