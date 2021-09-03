import { useState } from 'react';
import { useFetch } from './axios';

export const usePagination = ({ path, filters, limit = 5 }) => {
  const [page, setPage] = useState(0);
  const { apiData, loading, error } = useFetch({
    method: 'GET',
    url: `${path}/?_sort=created_at:DESC&_start=${page}&_limit=${limit}${filters}`,
  });
  const handlePageChange = (add) => {
    if (add === 'add') {
      setPage((prev) => {
        const isMaximum = apiData?.length < 25;

        return isMaximum ? prev : prev + 25;
      });
    } else {
      setPage((prev) => {
        const isZero = prev === 0;
        return isZero ? 0 : prev - 25;
      });
    }
  };

  return { handlePageChange, page, loading, error, apiData };
};
