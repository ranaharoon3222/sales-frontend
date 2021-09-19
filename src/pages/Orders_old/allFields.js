import React, { useState } from 'react';

const AllFields = () => {
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
    status: '',
    advance: 0,
    installment: false,
    quantity: 0,
    product: 0,
  });

  return { orderValues, setOrderValues };
};

export default AllFields;
