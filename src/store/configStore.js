import { createStore } from 'easy-peasy';
import Refrences from 'store/models/Refrence';
import Clients from 'store/models/Clients';
import Brands from 'store/models/Brands';
import Products from 'store/models/Products';

const store = createStore({
  Refrences,
  Clients,
  Brands,
  Products,
});

export default store;
