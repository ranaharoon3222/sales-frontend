import { useToasts } from './useToast';
import { useHistory } from 'react-router-dom';

export const useDelete = ({ path, redirect, title }) => {
  const history = useHistory();
  const { toast } = useToasts();

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:1337${path}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast({ title, status: 'error' });
        history.push(redirect);
      }
    } catch (error) {
      return error.message;
    }
  };

  return { handleDelete };
};
