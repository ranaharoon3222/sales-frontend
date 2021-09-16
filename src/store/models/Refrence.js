import { action, thunk } from 'easy-peasy';
import axios from 'axios';
import { REFRENCES } from 'settings/constant';

export default {
  list: [],
  add: action((state, payload) => {
    state.list.push(payload);
  }),
  save: thunk(async (actions, payload) => {
    const { data } = await axios.post(REFRENCES, payload);
    actions.add(data);
  }),
  update: thunk(async (actions, payload) => {
    const { data } = await axios.put(
      `${REFRENCES}/${payload.id}`,
      payload.updateValues
    );
    actions.add(data);
  }),
};
