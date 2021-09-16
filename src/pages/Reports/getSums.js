import React from 'react';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';

const GetSums = ({ apiData }) => {
  function getArraySum(mainArray) {
    var saleTotal = 0;
    var total = 0;
    var purchasePrice = 0;
    mainArray.forEach((element) => {
      total += element.total_price;
      element.order_comp.forEach((order) => {
        saleTotal += order.sale_price;
        purchasePrice += order.product.purchase_price;
      });
    });
    return [saleTotal, total, purchasePrice];
  }

  const [saleTotal, total, purchasePrice] = getArraySum(apiData);

  const values = [
    {
      label: 'Without Discounts',
      value: saleTotal,
    },
    {
      label: 'Total Values',
      value: total,
    },
    {
      label: 'Total Profit',
      value: total - purchasePrice,
    },
    {
      label: 'Total Discounted',
      value: total - saleTotal,
    },
  ];

  return (
    <SimpleGrid columns={4} spacingX={1} spacingY={1}>
      {values.map((item) => {
        return (
          <Box
            backgroundColor='white'
            boxShadow='base'
            textAlign='center'
            p={5}
            key={item.label}
            my={5}
          >
            <Text>{item.label}</Text>
            <Text fontWeight='semibold' fontSize='2xl'>
              Rs. {item.value}
            </Text>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default GetSums;
