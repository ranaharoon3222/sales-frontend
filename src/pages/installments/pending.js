import React from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Heading,
  Badge,
  Select,
} from '@chakra-ui/react';

const Pending = ({ apiData, Paginations, status, mutate }) => {
  const TableColumns = [
    {
      name: 'Approved',
      number: false,
    },
    {
      name: 'invoice No',
      number: false,
    },
    {
      name: 'Date',
      number: false,
    },
    {
      name: 'Customer Name',
      number: false,
    },

    {
      name: 'Remaining Balance',
      number: false,
    },
    {
      name: 'status',
      number: false,
    },
    {
      name: 'Total Amount',
      number: false,
    },
  ];

  const columns = apiData[status]?.map((item) => {
    const { name, status, price, invoice_no, total_price, invoice, id } = item;

    const approve = async (e) => {
      try {
        await axios.put(`/orders/approve/`, {
          status: e.target.value,
          id: invoice_no,
          invoice,
          i_id: id,
          price,
        });
        await mutate();
        return null;
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <Tr key={id} cursor='pointer'>
        <Td>
          <Select
            placeholder='Select Option'
            onChange={approve}
            defaultValue={status}
          >
            <option value='paid'>Paid</option>
            <option value='pending'> Pending </option>
            <option value='refunded'>Refunded</option>
          </Select>
        </Td>
        <Td> #{invoice_no} </Td>
        <Td> {invoice} </Td>
        <Td> {name} </Td>
        <Td> Rs {price} </Td>
        <Td>
          <Badge
            colorScheme={
              status === 'pending'
                ? 'orange'
                : status === 'refunded'
                ? 'red'
                : 'green'
            }
          >
            {status}{' '}
          </Badge>
        </Td>
        <Td> Rs {total_price} </Td>
      </Tr>
    );
  });

  return (
    <Box backgroundColor='white' boxShadow='base' overflowX='auto' my={10}>
      {/* <Filters setValue={setValue} value={value} /> */}
      <Heading fontSize={'md'} textTransform={'uppercase'} mx={7} my={7}>
        {status} Installments
      </Heading>
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
  );
};

export default Pending;
