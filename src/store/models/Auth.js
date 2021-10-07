import { action, thunk } from 'easy-peasy';
import axios from 'axios';

const Auth = {
  user: {},
  add: action((state, payload) => {
    state.user = payload;
  }),
  save: thunk(async (actions, payload) => {
    const { data } = await axios.post('/auth/local', payload);
    actions.add(data);
  }),
  logOut: action((state, payload) => {
    state.user = {};
  }),
};

export default Auth;
