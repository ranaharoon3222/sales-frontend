import React from 'react';
import Skeletn from 'components/skeleton';
import { usePagination } from 'helpers/usePagination';
import { PAGINATION_LIMIT } from 'settings/constant';
import InstallmentTable from './pending';

const Installments = () => {
  const { apiData, loading, error, Paginations, mutate } = usePagination({
    path: '/orders/installment',
    // filters: `&${query}`,
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
      <InstallmentTable
        apiData={apiData}
        Paginations={Paginations}
        status={'pending'}
        mutate={mutate}
      />
      <InstallmentTable
        apiData={apiData}
        Paginations={Paginations}
        status={'paid'}
        mutate={mutate}
      />
      <InstallmentTable
        apiData={apiData}
        Paginations={Paginations}
        status={'refunded'}
        mutate={mutate}
      />
    </>
  );
};

export default Installments;
