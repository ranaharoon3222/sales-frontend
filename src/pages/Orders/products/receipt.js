import React from 'react';
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

const Receipt = () => {
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
      name: 'description',
      number: false,
    },
  ];

  const columns = apiData.map((item, index) => {
    const { name, id, description } = item;

    return (
      <Tr key={index} cursor='pointer'>
        <Td width='70px'>
          <IoTrashOutline color='red' size='22px' />
        </Td>
        <Td> {name} </Td>
        <Td> {description} </Td>
      </Tr>
    );
  });

  return (
    <Box backgroundColor='white' boxShadow='base' overflowX='auto'>
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

export default Receipt;
