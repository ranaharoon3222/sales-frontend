import { useToasts } from './useToast';

export const useDelete = () => {
  const { toast } = useToasts();

  const handleDelete = async ({ path, title, mutate }) => {
    try {
      const res = await fetch(`http://localhost:1337${path}`, {
        method: 'DELETE',
      });
      // refresh it
      await mutate();
      // end refresh it

      console.log('res');
      if (res.ok) {
        toast({ title, status: 'error' });
      }
    } catch (error) {
      return error.message;
    }
  };

  return { handleDelete };
};
