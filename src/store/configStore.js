import { createStore } from 'easy-peasy';
import Refrences from 'store/models/Refrence';
import Clients from 'store/models/Clients';
import Brands from 'store/models/Brands';

const store = createStore({
  Refrences,
  Clients,
  Brands,
});

export default store;
