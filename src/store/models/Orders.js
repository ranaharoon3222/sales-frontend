import { action, thunk } from 'easy-peasy';
import axios from 'axios';
import { ORDERS } from 'settings/constant';

const Orders = {
  list: {},
  cart: [],
  order_comp: [],
  addOrderComp: action((state, payload) => {
    state.order_comp = payload;
  }),
  addCart: action((state, payload) => {
    state.cart.push(payload);
  }),
  updateCart: action((state, payload) => {
    state.cart.map((item, i) => {
      if (item.id === payload.id) {
        state.cart[i] = {
          ...state.cart[i],
          installments: payload.installments,
        };
      }
      return null;
    });
  }),
  deleteCart: action((state, payload) => {
    state.cart.map((item, index) => {
      if (item.id === payload.id) {
        state.cart.splice(index, 1);
      }
      return null;
    });
  }),
  clearCart: action((state, payload) => {
    state.cart = [];
  }),
  add: action((state, payload) => {
    state.list = payload;
  }),
  save: thunk(async (actions, payload) => {
    const { data } = await axios.post(ORDERS, payload);
    actions.add(data);
  }),
  update: thunk(async (actions, payload) => {
    const { data } = await axios.put(
      `${ORDERS}/${payload.id}`,
      payload.updateValues
    );
    actions.add(data);
  }),
};

export default Orders;
