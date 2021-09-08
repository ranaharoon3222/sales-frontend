import { useState, useEffect } from 'react';
import { useFetch } from './axios';
import PaginationToolBar from '../components/PgainationToolBar';
import { PAGINATION_LIMIT } from '../settings/constant';

export const usePagination = ({ path, filters, limit = 5 }) => {
  const [page, setPage] = useState(0);

  const { apiData, error, loading, isValidating, mutate } = useFetch(
    `${path}/?_sort=created_at:DESC&_start=${page}&_limit=${limit}${filters}`
  );

  const handlePageChange = (add) => {
    if (add === 'add') {
      setPage((prev) => {
        const isMaximum = apiData?.length < limit;

        return isMaximum ? prev : prev + limit;
      });
    } else {
      setPage((prev) => {
        const isZero = prev === 0;
        return isZero ? 0 : prev - limit;
      });
    }
  };

  useEffect(() => {
    setPage(0);
    console.log('Search started');
  }, [filters]);

  const Paginations = () => {
    return (
      <PaginationToolBar
        handlePageChange={handlePageChange}
        data={apiData.length}
        limit={PAGINATION_LIMIT}
        page={page}
      />
    );
  };

  return { page, loading, error, apiData, Paginations, isValidating, mutate };
};
