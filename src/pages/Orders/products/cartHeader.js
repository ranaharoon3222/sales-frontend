import React from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/react';

const cartHeader = () => {
  return (
    <Grid
      templateColumns='repeat(8, 1fr)'
      gap={2}
      alignItems='center'
      borderBottom='1px'
      pb={2}
      mb={3}
      borderColor='blackAlpha.300'
    >
      <GridItem colSpan={1}>
        <Text fontWeight='semibold' fontSize='xs'>
          X
        </Text>
      </GridItem>
      <GridItem colSpan={3}>
        <Text fontWeight='semibold' fontSize='xs'>
          Products
        </Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Text fontWeight='semibold' fontSize='xs'>
          Quantity
        </Text>
      </GridItem>

      <GridItem colSpan={2}>
        <Text fontWeight='semibold' textAlign='right' fontSize='xs'>
          Total
        </Text>
      </GridItem>
    </Grid>
  );
};

export default cartHeader;
