import useSwr from 'swr';
import { useToasts } from './useToast';

const baseUrl = 'http://localhost:1337';

export const useFetch = (path, name) => {
  const { toast } = useToasts();

  if (!path) {
    throw new Error('Path is required');
  }

  const url = name ? baseUrl + path + '/' + name : baseUrl + path;
  const {
    data: apiData,
    error,
    isValidating,
    mutate,
  } = useSwr(url, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      if (error.status === 404) return;

      // Only retry up to 10 times.
      if (retryCount >= 10) return;

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
    onError: () => toast({ title: 'Error While Fetching', status: 'error' }),
  });

  return { apiData, error, loading: !apiData && !error, isValidating, mutate };
};
