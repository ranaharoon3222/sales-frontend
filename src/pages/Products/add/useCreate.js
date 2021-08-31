import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { Alert } from '@chakra-ui/react';
import useSelect from '../../../components/select';
import SimpleSelect from '../../../components/select/simpleSelect';
import { useCleanObjects } from '../../../helpers/useCleanObjects';

const useCreate = () => {
  const [allValues, setAllValues] = useState({
    product_name: '',
    item_code: '',
    sale_price: 0,
    model_no: '',
    unit: 'PCS',
    opening_stock: 0,
    purchase_price: 0,
    brand: '',
    print_name: '',
    stock_value: 0,
    stock: 0,
  });

  const {
    sale_price,
    product_name,
    item_code,
    model_no,
    brand,
    unit,
    opening_stock,
    stock_value,
    purchase_price,
    stock,
    print_name,
  } = allValues;

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { selectComponent, selectValue } = useSelect('brands');
  const { cleanObjects } = useCleanObjects();

  const handleChange = (e) => {
    if (e.value) {
      setAllValues((prevVal) => {
        return {
          ...prevVal,
          unit: e.value,
        };
      });
    } else {
      setAllValues((prevVal) => {
        const { value } = e.target;
        return {
          ...prevVal,
          [e.target.name]: e.target.type === 'number' ? Number(value) : value,
          print_name:
            e.target.name === 'print_name' || e.target.name === 'product_name'
              ? value
              : print_name,
        };
      });
    }
  };

  const productInputs = [
    {
      name: 'item_code',
      value: item_code,
    },
    {
      name: 'product_name',
      value: product_name,
    },
    {
      name: 'model_no',
      value: model_no,
    },
    {
      name: 'print_name',
      value: print_name,
    },
    {
      name: 'brand',
      value: brand,
      component: selectComponent(),
    },
    {
      name: 'purchase_price',
      value: purchase_price,
      type: 'number',
    },
    {
      name: 'sale_price',
      value: sale_price,
      type: 'number',
    },
    {
      name: 'unit',
      value: unit,
      component: <SimpleSelect handleChange={handleChange} />,
    },
    {
      name: 'opening_stock',
      value: opening_stock,
      type: 'number',
    },
    {
      name: 'stock',
      value: stock,
      type: 'number',
    },
    {
      name: 'stock_value',
      value: stock_value,
      type: 'number',
    },
  ];

  const handleSubmit = async () => {
    const updateValues = cleanObjects({ ...allValues });
    setLoading(true);
    try {
      const res = await axios.post('/products', updateValues);
      setSuccess(res.status === 200);
      setError(false);
    } catch (error) {
      setSuccess(false);
      setError(error.message);
      setLoading(false);
    }

    setLoading(false);
  };

  const successResponse = () => {
    return (
      <Alert status='success'>
        <AiFillCheckCircle
          size='25px'
          color='green'
          style={{ marginRight: '10px' }}
        />
        Product Created Successfully
      </Alert>
    );
  };
  const errorResponse = () => {
    return (
      <Alert status='error'>
        <AiFillCloseCircle
          size='25px'
          color='red'
          style={{ marginRight: '10px' }}
        />
        {error}
      </Alert>
    );
  };

  useEffect(() => {
    setAllValues((prevVal) => {
      return {
        ...prevVal,
        stock_value: Number(purchase_price) * Number(stock),
        brand: selectValue || 0,
      };
    });
  }, [purchase_price, stock, product_name, selectValue]);

  return {
    successResponse,
    errorResponse,
    error,
    success,
    productInputs,
    handleChange,
    loading,
    handleSubmit,
    selectComponent,
  };
};

export default useCreate;
