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
} from './settings/constant';
import Products from './pages/Products';
import AddProducts from './pages/Products/add/add';
import UpdateProducts from './pages/Products/update/update';
import Clients from './pages/Clients';
import AddClients from './pages/Clients/add/add';
import UpdateClients from './pages/Clients/update/update';
import Orders from './pages/Orders';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:1337';

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
      path: ADD_PRODUCTS,
      compnent: <AddProducts />,
      exact: true,
    },
    {
      path: UPDATE_PRODUCTS,
      compnent: <UpdateProducts />,
      exact: false,
    },
  ];

  return (
    <HashRouter>
      <div>
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
      </div>
    </HashRouter>
  );
};

export default MyApp;
