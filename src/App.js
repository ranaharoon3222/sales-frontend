import React from 'react';
import Layout from './containers/Layout';
import Home from './pages/Home';
import { HashRouter, Switch, Route } from 'react-router-dom';
import {
  PRODUCTS,
  CLIENTS,
  ORDERS,
  ADD_PRODUCTS,
  UPDATE_PRODUCTS,
  UPDATE_CLIENTS,
  ADD_CLIENTS,
  BRANDS,
  ADD_BRANDS,
  UPDATE_BRANDS,
  ADD_ORDERS,
  UPDATE_ORDERS,
} from './settings/constant';
import Products from './pages/Products';
import AddProducts from './pages/Products/add/add';
import UpdateProducts from './pages/Products/update/update';
import Clients from './pages/Clients';
import AddClients from './pages/Clients/add/add';
import UpdateClients from './pages/Clients/update/update';
import Brands from './pages/Brands';
import AddBrands from './pages/Brands/add/add';
import UpdateBrands from './pages/Brands/update/update';
import Orders from './pages/Orders';
import AddOrders from './pages/Orders/add/add';
import { SWRConfig } from 'swr';


const MyApp = () => {
  const allRoutes = [
    {
      path: '/',
      compnent: <Home />,
      exact: true,
    },
    {
      path: PRODUCTS,
      compnent: <Products />,
      exact: true,
    },
    {
      path: CLIENTS,
      compnent: <Clients />,
      exact: true,
    },
    {
      path: ADD_CLIENTS,
      compnent: <AddClients />,
      exact: true,
    },
    {
      path: UPDATE_CLIENTS,
      compnent: <UpdateClients />,
      exact: false,
    },
    {
      path: ORDERS,
      compnent: <Orders />,
      exact: true,
    },
    {
      path: ADD_ORDERS,
      compnent: <AddOrders />,
      exact: true,
    },

    {
      path: ADD_PRODUCTS,
      compnent: <AddProducts />,
      exact: true,
    },
    {
      path: UPDATE_PRODUCTS,
      compnent: <UpdateProducts />,
      exact: false,
    },

    {
      path: BRANDS,
      compnent: <Brands />,
      exact: true,
    },
    {
      path: ADD_BRANDS,
      compnent: <AddBrands />,
      exact: true,
    },
    {
      path: UPDATE_BRANDS,
      compnent: <UpdateBrands />,
      exact: false,
    },
  ];

  return (
    <HashRouter>
      <div>
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => {
                if (res.status === 400) {
                  throw new Error('400 error Occurs');
                }
                return res.json();
              }),
          }}
        >
          <Layout>
            <Switch>
              {allRoutes.map((route, i) => {
                return (
                  <Route
                    path={route.path}
                    exact={route.exact}
                    key={i + route.path}
                  >
                    {route.compnent}
                  </Route>
                );
              })}
            </Switch>
          </Layout>
        </SWRConfig>
      </div>
    </HashRouter>
  );
};

export default MyApp;
