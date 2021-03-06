import { action, thunk } from 'easy-peasy';
import axios from 'axios';
import { CLIENTS } from 'settings/constant';

const Clients = {
  list: [],
  add: action((state, payload) => {
    state.list.push(payload);
  }),
  save: thunk(async (actions, payload) => {
    const { data } = await axios.post(CLIENTS, payload);
    actions.add(data);
  }),
  update: thunk(async (actions, payload) => {
    const { data } = await axios.put(
      `${CLIENTS}/${payload.id}`,
      payload.updateValues
    );
    actions.add(data);
  }),
};

export default Clients;
