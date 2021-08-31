import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import ProductTable from './productTable';
import ClientsTable from './clientsTable';
import OrderTable from './orderTable';
import Counts from './counts';

const Home = () => {
  return (
    <>
      <SimpleGrid columns={[1, 1, 2, 3]} spacingX={5} spacingY={1} mb={5}>
        <Counts heading='All Clinets' url='/clients/count' />
        <Counts heading='All Products' url='/products/count' />
        <Counts heading='All Refrences' url='/refrences/count' />
      </SimpleGrid>
      <SimpleGrid columns={[1, 1, 1, 2]} spacingX={5} spacingY={1}>
        <ProductTable />
        <ClientsTable />
      </SimpleGrid>
      <SimpleGrid columns={1} spacingX={5} spacingY={1} mt={5}>
        <OrderTable />
      </SimpleGrid>
    </>
  );
};

export default Home;
