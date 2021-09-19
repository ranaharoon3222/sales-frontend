import React from 'react';
import asyncSelect from '../../../components/select/orderSelect';
import { Button, Grid, GridItem } from '@chakra-ui/react';
import OrderInput from './OrderInput';

const ProductItems = ({
  handleInputChange,
  handleAddClick,
  handleRemoveClick,
  productItems,
}) => {
  const { SelectComponent: ProductSelect } = asyncSelect(
    'products',
    'product_name'
  );

  return (
    <>
      {productItems.map((item, i) => {
        return (
          <Grid
            placeItems='center'
            templateColumns='repeat(8, 1fr)'
            gap={3}
            key={i}
          >
            <GridItem colSpan={2} width='100%'>
              <ProductSelect
                onChange={(e) => handleInputChange(e, i)}
                value={{ label: item.label }}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <OrderInput
                label={'Quantity'}
                value={item.quantity}
                onChange={(e) => handleInputChange(e, i)}
                name='quantity'
                type='number'
                min='1'
                required={true}
              />
            </GridItem>{' '}
            <GridItem colSpan={1}>
              <OrderInput
                label={'Sale Price'}
                value={item.sale_price}
                onChange={(e) => handleInputChange(e, i)}
                name='sale_price'
                type='number'
                min='0'
                required={true}
              />
            </GridItem>{' '}
            <GridItem colSpan={1}>
              <OrderInput
                label={'discount'}
                value={item.discount}
                onChange={(e) => handleInputChange(e, i)}
                name='discount'
                type='number'
                min='0'
              />
            </GridItem>
            <GridItem colSpan={1}>
              <OrderInput
                label={'Total Price'}
                value={item.total_price}
                disabled={true}
                name='total_price'
                type='number'
              />
            </GridItem>
            <GridItem colSpan={2} marginTop={5}>
              {productItems.length - 1 === i && (
                <Button mr={4} colorScheme='purple' onClick={handleAddClick}>
                  Add
                </Button>
              )}
              {productItems.length !== 1 && (
                <Button
                  colorScheme='red'
                  className='mr10'
                  onClick={() => handleRemoveClick(i)}
                >
                  Remove
                </Button>
              )}
            </GridItem>
          </Grid>
        );
      })}
    </>
  );
};

export default ProductItems;
