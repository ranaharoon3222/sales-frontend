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
import { CLIENTS, PAGINATION_LIMIT } from 'settings/constant';
import { useHistory } from 'react-router-dom';
import { useDelete } from 'helpers/useSingleDelete';
import { IoTrashOutline } from 'react-icons/io5';

const Products = () => {
  const history = useHistory();
  const [value, setValue] = useState('');

  const query = qs.stringify({
    _where: {
      _or: [
        { Name_contains: value },
        { mobile_no_contains: value },
        { cnic_contains: value },
      ],
    },
  });
  const { apiData, loading, error, Paginations, mutate } = usePagination({
    path: CLIENTS,
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
      name: 'Name',
      number: false,
    },

    {
      name: 'occupation',
      number: false,
    },
    {
      name: 'Age',
      number: true,
    },

    {
      name: 'Mobile No',
      number: true,
    },
    {
      name: 'CNIC',
      number: true,
    },
  ];

  const columns = apiData.map((item, index) => {
    const { Name, occupation, age, mobile_no, cnic, id } = item;

    const pushToSinglePage = () => {
      history.push(`${CLIENTS}/${id}`);
    };

    return (
      <Tr key={item.id} cursor='pointer'>
        <Td
          width='70px'
          onClick={() =>
            handleDelete({
              path: `${CLIENTS}/${id}`,
              title: `${item.Name} Deleted Successfully`,
              mutate,
            })
          }
        >
          <IoTrashOutline color='red' size='22px' />
        </Td>
        <Td onClick={pushToSinglePage}> {Name} </Td>
        <Td> {occupation} </Td>
        <Td isNumeric> {age} </Td>
        <Td isNumeric> {mobile_no} </Td>
        <Td isNumeric> {cnic} </Td>
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
