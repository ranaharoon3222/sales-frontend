import { action, thunk } from 'easy-peasy';
import axios from 'axios';
import { PROFILE } from 'settings/constant';

const Profile = {
  list: [],

  add: action((state, payload) => {
    state.list.push(payload);
  }),
  loadList: action((state, payload) => {
    state.list = payload;
  }),
  save: thunk(async (actions, payload) => {
    const { data } = await axios.post(PROFILE, payload);
    actions.add(data);
  }),
  update: thunk(async (actions, payload) => {
    const { data } = await axios.put(
      `${PROFILE}/${payload.id}`,
      payload.updateValues
    );
    actions.add(data);
  }),
  load: thunk(async (actions, payload) => {
    const { data } = await axios.get(`${PROFILE}`);
    actions.loadList(data);
  }),
};

export default Profile;
