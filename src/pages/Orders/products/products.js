import React from 'react';
import { SimpleGrid, Box, Text } from '@chakra-ui/react';
import { usePagination } from 'helpers/usePagination';
import qs from 'qs';
import Skeletn from 'components/skeleton';
import { PRODUCTS, PAGINATION_LIMIT } from 'settings/constant';

const Products = ({ cartItems, append, addToCart, value }) => {
  const query = qs.stringify({
    _where: {
      _or: [{ item_code_contains: value }, { product_name_contains: value }],
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

  return (
    <>
      <SimpleGrid columns={3} spacingX={3} spacingY={3} p={3}>
        {apiData.map((item) => {
          const isSelected = cartItems?.some((ele) => ele.id === item.id);

          return (
            <Box
              shadow='sm'
              borderRadius='lg'
              bg={isSelected ? 'black' : 'gray.300'}
              color={isSelected ? 'white' : 'black'}
              p={3}
              key={item.id}
              onClick={() => {
                if (item.stock <= 0) {
                  return alert('Stock Not Available');
                }
                addToCart({
                  ...item,
                });

                append({
                  quantity: 1,
                  product: item.id,
                  sale_price: item.sale_price,
                  unit: item.unit,
                  discount: 0,
                  total_price: item.sale_price,
                });
              }}
              pointerEvents={isSelected ? 'none' : 'all'}
            >
              <Text fontWeight='semibold' textAlign='center'>
                {item.product_name} - {item.brand?.name}
              </Text>
              <Text fontWeight='semibold' textAlign='center' py={2}>
                PKR {item.sale_price}
              </Text>
              <Text fontWeight='semibold' textAlign='center' fontSize='xs'>
                Item Code: {item.item_code}
              </Text>
              <Text fontWeight='semibold' textAlign='center' fontSize='xs'>
                Stock Available : {item.stock}
              </Text>
            </Box>
          );
        })}
      </SimpleGrid>
      {Paginations()}
    </>
  );
};

export default Products;
