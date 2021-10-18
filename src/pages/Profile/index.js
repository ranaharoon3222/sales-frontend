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
  Button,
} from '@chakra-ui/react';
import Skeletn from 'components/skeleton';
import { usePagination } from 'helpers/usePagination';
import Filters from 'components/filters';
import qs from 'qs';
import { PROFILE, PAGINATION_LIMIT, ADD_PROFILE } from 'settings/constant';
import { useHistory, Link } from 'react-router-dom';
import { useDelete } from 'helpers/useSingleDelete';
import { IoTrashOutline } from 'react-icons/io5';

const Products = () => {
  const history = useHistory();
  const [value, setValue] = useState('');

  const query = qs.stringify({
    _where: {
      _or: [{ name_contains: value }],
    },
  });

  const { apiData, loading, error, Paginations, mutate } = usePagination({
    path: PROFILE,
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
      name: 'name',
      number: false,
    },

    {
      name: 'address',
      number: false,
    },
    {
      name: 'mobile',
      number: false,
    },
  ];

  const columns = apiData.map((item, index) => {
    const { name, id, address, mobile } = item;

    const pushToSinglePage = () => {
      history.push(`${PROFILE}/${id}`);
    };

    return (
      <Tr key={index} cursor='pointer'>
        <Td
          width='70px'
          onClick={() =>
            handleDelete({
              path: `${PROFILE}/${id}`,
              title: `${item.name} Deleted Successfully`,
              mutate,
            })
          }
        >
          <IoTrashOutline color='red' size='22px' />
        </Td>
        <Td onClick={pushToSinglePage}> {name} </Td>
        <Td> {address} </Td>
        <Td> {mobile} </Td>
      </Tr>
    );
  });

  return (
    <>
      <Box backgroundColor='white' boxShadow='base' overflowX='auto'>
        <Filters setValue={setValue} value={value} />
        <Button colorScheme={'purple'} mx={5} my={6}>
          <Link to={ADD_PROFILE}>Add Profile </Link>
        </Button>
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
