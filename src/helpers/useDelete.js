import { useToasts } from './useToast';
import { useHistory } from 'react-router-dom';

export const useDelete = ({ path, redirect, title }) => {
  const { toast } = useToasts();
  const history = useHistory();

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:1337${path}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast({ title, status: 'error' });
        setTimeout(() => {
          history.push(redirect);
        }, 500);
      }
    } catch (error) {
      return error.message;
    }
  };

  return { handleDelete };
};
