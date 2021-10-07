import { useSubmit } from './useSubmit';
import { ORDERS } from 'settings/constant';
import Products from './products';
import Clients from './client';
import Alert from 'components/Alert';

const AddOrders = () => {
  const { submitValues, onSubmit } = useSubmit({
    path: ORDERS,
    redirect: false,
  });
  const {
    error,
    errorResponse,
    success,
    successResponse,
    handleSubmit,
    errors,
  } = submitValues;

  return (
    <div>
      {success && successResponse()}
      {error && errorResponse()}
      {errors?.name && <Alert> {errors.name.message}</Alert>}

      {console.log(errors)}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Clients submitValues={submitValues} />
        <Products submitValues={submitValues} />
      </form>
    </div>
  );
};

export default AddOrders;
