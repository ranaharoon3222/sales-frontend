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
import PaginationToolBar from '../../components/PgainationToolBar';
import { CLIENTS } from '../../settings/constant';
import { useHistory } from 'react-router-dom';

const Products = () => {
  const history = useHistory();
  const [value, setValue] = useState('');

  const query = qs.stringify({
    _where: {
      _or: [
        { Name_contains: value },
        { mobile_no_contains: value },
        { cnic_contains: value },
        { occupation_contains: value },
      ],
    },
  });
  const { handlePageChange, apiData, loading, error } = usePagination({
    path: CLIENTS,
    filters: `&${query}`,
    limit: 25,
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
    {
      name: 'Reffrences',
      number: true,
    },
    {
      name: 'Orders',
      number: true,
    },
  ];

  const columns = apiData.map((item, index) => {
    const { Name, occupation, age, mobile_no, cnic, refrences, orders, id } =
      item;

    const pushToSinglePage = () => {
      history.push(`${CLIENTS}/${id}`);
    };

    return (
      <Tr key={index} onClick={pushToSinglePage} cursor='pointer'>
        <Td> {Name} </Td>
        <Td> {occupation} </Td>
        <Td isNumeric> {age} </Td>
        <Td isNumeric> {mobile_no} </Td>
        <Td isNumeric> {cnic} </Td>
        <Td isNumeric> {refrences.length} </Td>
        <Td isNumeric> {orders.length} </Td>
      </Tr>
    );
  });

  return (
    <>
      <Box backgroundColor='white' boxShadow='base' overflowX='auto'>
        <Filters setValue={setValue} />
        <Table variant='simple'>
          <TableCaption>
            <PaginationToolBar
              handlePageChange={handlePageChange}
              data={apiData.length}
            />
          </TableCaption>
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
