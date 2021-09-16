import { action, thunk } from 'easy-peasy';
import axios from 'axios';
import { BRANDS } from 'settings/constant';

export default {
  list: [],
  add: action((state, payload) => {
    state.list.push(payload);
  }),
  save: thunk(async (actions, payload) => {
    const { data } = await axios.post(BRANDS, payload);
    actions.add(data);
  }),
  update: thunk(async (actions, payload) => {
    const { data } = await axios.put(
      `${BRANDS}/${payload.id}`,
      payload.updateValues
    );
    actions.add(data);
  }),
};
