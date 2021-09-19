import React, { useState, useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import ProductTable from './productTable';
import ClientsTable from './clientsTable';
import OrderTable from './orderTable';
import Counts from './counts';

const Home = () => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const getSales = async () => {
      const res = await fetch('http://localhost:1337/metabases');
      const data = await res.json();
      setUrl((prev) => {
        return data
          .filter((item) => item.type === 'sales')
          .map((item) => {
            return item.url;
          });
      });
    };
    getSales();
  }, []);

  return (
    <>
      <SimpleGrid columns={[1, 1, 2, 4]} spacingX={5} spacingY={1} mb={5}>
        <Counts heading='All Clinets' url='/clients/count' />
        <Counts heading='All Products' url='/products/count' />
        <Counts heading='All Orders' url='/orders/count' />
        <Counts heading='All Brands' url='/brands/count' />
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
