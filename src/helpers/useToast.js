import { useToast } from '@chakra-ui/react';

export const useToasts = () => {
  let message = useToast();

  const toast = ({ title = 'Successful', status = 'success' }) => {
    message({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };

  return { toast };
};
