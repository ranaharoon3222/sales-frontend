import { createStore, persist } from 'easy-peasy';
import Refrences from 'store/models/Refrence';
import Clients from 'store/models/Clients';
import Brands from 'store/models/Brands';
import Products from 'store/models/Products';
import Auth from 'store/models/Auth';
import Orders from 'store/models/Orders';

const store = createStore({
  Refrences,
  Clients,
  Brands,
  Products,
  Orders,
  Auth: persist(Auth, {
    storage: 'localStorage',
  }),
});

export default store;
