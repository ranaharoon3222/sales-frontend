import React, { useState, useEffect } from 'react';
import { useDisclosure, Button, Box, Text, SimpleGrid } from '@chakra-ui/react';
import { OrderDrawer } from './useDrawer';
import OrderInput from './OrderInput';
import RadioInput from './RadioInput';
import useClient from './useClient';
import { useOrderSubmit } from '../../../helpers/useOrderSubmit';
import Installments from './installments';
import useInstallments from './useInstallment';
import DynamicItems from './useDynamicItems';
import ProductItems from './productItems';

const AllFields = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [orderValues, setOrderValues] = useState({
    name: '',
    contact_no: '',
    address: '',
    top_level_discount: 0,
    shipping: 0,
    invoice_date: '',
    bill_to: '',
    client: '',
    total_price: '',
    status: 'paid',
    advance: 0,
    subTotal: 0,
    Installment: false,
  });

  const { clientSelects } = useClient(setOrderValues);
  const { handleAddClick, handleInputChange, handleRemoveClick, productItems } =
    DynamicItems();
  const {
    InhandleAddClick,
    InhandleInputChange,
    InhandleRemoveClick,
    installmentsItem,
  } = useInstallments();

  const [RadioValue, setRadio] = useState('cash_ac');

  const handleChange = (e) => {
    setOrderValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleChangeSwitch = (e) => {
    setOrderValues((prev) => {
      return {
        ...prev,
        Installment: !prev.Installment,
      };
    });
  };

  useEffect(() => {
    let total = 0;
    productItems.forEach((item) => {
      return (total = total + item.total_price);
    });
    setOrderValues((prev) => {
      return {
        ...prev,
        bill_to: RadioValue,
        subTotal: total,
        total_price: total + Number(orderValues.shipping),
      };
    });
  }, [RadioValue, productItems, orderValues.shipping]);

  const { submitValues: orderSubmitValues, onSubmit } = useOrderSubmit({
    method: 'POST',
    path: '/orders',
  });

  const { loading, success, successResponse, errorResponse, error } =
    orderSubmitValues;

  const submitValues = async () => {
    const finalSubmission = {
      ...orderValues,
      order_comp: productItems,
      installments: orderValues.Installment ? installmentsItem : [],
    };

    onSubmit(finalSubmission);
  };

  return (
    <Box bg='white' shadow='base' p={5}>
      {error && errorResponse()}
      {success && successResponse()}
      <SimpleGrid columns={2} spacingX={1} spacingY={1} cursor='pointer'>
        <Box my={7} bg='gray.200' p={4} onClick={onOpen}>
          <Text fontWeight='semibold' mb={2}>
            Name: {orderValues.name}
          </Text>
          <Text fontWeight='semibold' mb={2}>
            Address: {orderValues.address}
          </Text>
          <Text fontWeight='semibold' mb={2}>
            Mobile No: {orderValues.contact_no}
          </Text>
        </Box>
        <Box my={7} bg='white' p={4}>
          <OrderInput
            name='invoice_date'
            value={orderValues.invoice_date}
            onChange={handleChange}
            label='Invoice Date?'
            type='date'
          />
          <OrderInput
            name='shipping'
            value={orderValues.shipping}
            onChange={handleChange}
            label='shipping'
            type='number'
          />
        </Box>
      </SimpleGrid>

      <ProductItems
        productItems={productItems}
        handleAddClick={handleAddClick}
        handleRemoveClick={handleRemoveClick}
        handleInputChange={handleInputChange}
      />

      <OrderDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <RadioInput label='Bill To' value={RadioValue} setRadio={setRadio} />
        {RadioValue === 'client_ac' && clientSelects()}

        <OrderInput
          label={'Client Name'}
          value={orderValues.name}
          onChange={handleChange}
          name='name'
        />
        <OrderInput
          label={'Contact No'}
          value={orderValues.contact_no}
          onChange={handleChange}
          name='contact_no'
        />
        <OrderInput
          label={'Address'}
          value={orderValues.address}
          onChange={handleChange}
          name='address'
        />
      </OrderDrawer>

      <Box mt={4}>
        <OrderInput
          name='installment'
          value={orderValues.Installment}
          onChange={handleChangeSwitch}
          id='installment'
          type='switch'
          label='Installments?'
          colorScheme='purple'
        />
      </Box>

      {orderValues.Installment && (
        <Installments
          handleAddClick={InhandleAddClick}
          handleInputChange={InhandleInputChange}
          handleRemoveClick={InhandleRemoveClick}
          installmentsItem={installmentsItem}
          advance={orderValues.advance}
          handleChange={handleChange}
        />
      )}

      <Text fontSize='2xl' textAlign='right' mt={8}>
        <b>SubTotal</b> : {orderValues.subTotal}
      </Text>
      <Text fontSize='2xl' textAlign='right' mt={8}>
        <b>Shipping</b> : {orderValues.shipping}
      </Text>
      <Text fontSize='2xl' textAlign='right' mt={8}>
        <b>Total</b> : {orderValues.total_price}
      </Text>
      <Button
        loadingText='Submitting...'
        isLoading={loading}
        colorScheme='purple'
        onClick={submitValues}
        mt={4}
      >
        Submit Now
      </Button>
    </Box>
  );
};

export default AllFields;
