import { action, thunk } from 'easy-peasy';
import axios from 'axios';
import { PRODUCTS } from 'settings/constant';

const Products = {
  list: [],
  formValues: {},
  values: action((state, payload) => {
    state.formValues = { ...state.formValues, ...payload };
  }),
  add: action((state, payload) => {
    state.list.push(payload);
  }),
  save: thunk(async (actions, payload) => {
    const { data } = await axios.post(PRODUCTS, payload);
    actions.add(data);
  }),
  update: thunk(async (actions, payload) => {
    const { data } = await axios.put(
      `${PRODUCTS}/${payload.id}`,
      payload.updateValues
    );
    actions.add(data);
  }),
};

export default Products;
