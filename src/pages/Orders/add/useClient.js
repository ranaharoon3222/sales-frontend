import React, { useState, useEffect } from 'react';
import asyncSelect from '../../../components/select/orderSelect';
import { useFetch } from '../../../helpers/axios';

const useClient = (setOrderValues) => {
  const [clientValue, setClientValue] = useState('');
  const { SelectComponent: ClientSelect } = asyncSelect('clients', 'Name');
  const { loading, apiData } = useFetch(
    clientValue.value ? `/clients/${clientValue.value}` : '/clients'
  );

  const changeClient = (value) => {
    setClientValue(value);
  };

  useEffect(() => {
    if (!loading) {
      setOrderValues((prev) => {
        return {
          ...prev,
          name: apiData.Name || '',
          address: apiData.permanent_address || '',
          contact_no: apiData.mobile_no || '',
          client: clientValue.value,
        };
      });
    }
  }, [
    apiData?.Name,
    apiData?.mobile_no,
    apiData?.permanent_address,
    apiData,
    clientValue.value,
    setOrderValues,
  ]);

  const clientSelects = () => {
    return <ClientSelect onChange={changeClient} value={clientValue} />;
  };

  return { clientSelects };
};

export default useClient;
