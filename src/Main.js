import React from 'react';
import Layout from './containers/Layout';
import Home from './pages/Home';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
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
  REFRENCES,
  ADD_REFRENCES,
  REPORTS,
  UPDATE_REFRENCES,
  PROFILE,
  ADD_PROFILE,
  UPDATE_PROFILE,
} from './settings/constant';
import Products from 'pages/Products';
import AddProducts from 'pages/Products/add';
import UpdateProducts from 'pages/Products/update';
import Clients from 'pages/Clients';
import AddClients from 'pages/Clients/add';
import UpdateClients from 'pages/Clients/update';
import Brands from 'pages/Brands';
import AddBrands from 'pages/Brands/add';
import UpdateBrands from 'pages/Brands/update';
import Orders from 'pages/Orders';
import AddOrders from 'pages/Orders/add';
import Refrences from 'pages/Refrence/';
import UpdateRefrences from 'pages/Refrence/update';
import AddRefrences from 'pages/Refrence/add';
import Profiles from 'pages/Profile';
import UpdateProfiles from 'pages/Profile/update';
import AddProfiles from 'pages/Profile/add';
import Reports from 'pages/Reports';
import Auth from 'auth/login';
import Installments from 'pages/installments';
import { SWRConfig } from 'swr';
import { useStoreState } from 'easy-peasy';

const MyApp = () => {
  const allRoutes = [
    {
      path: '/',
      compnent: <Home />,
      exact: true,
    },
    {
      path: '/installments',
      compnent: <Installments />,
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
    {
      path: PROFILE,
      compnent: <Profiles />,
      exact: true,
    },
    {
      path: ADD_PROFILE,
      compnent: <AddProfiles />,
      exact: true,
    },
    {
      path: UPDATE_PROFILE,
      compnent: <UpdateProfiles />,
      exact: false,
    },
    {
      path: REFRENCES,
      compnent: <Refrences />,
      exact: true,
    },
    {
      path: ADD_REFRENCES,
      compnent: <AddRefrences />,
      exact: true,
    },
    {
      path: UPDATE_REFRENCES,
      compnent: <UpdateRefrences />,
      exact: false,
    },
    {
      path: REPORTS,
      compnent: <Reports />,
      exact: true,
    },
  ];

  const user = useStoreState((state) => state.Auth.user);

  return (
    <BrowserRouter>
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
          <Route exact path='/login'>
            <Auth />
          </Route>
          <Layout visibility={!user.jwt && 'none'}>
            <Switch>
              {allRoutes.map((route, i) => {
                if (user.jwt) {
                  return (
                    <Route
                      path={route.path}
                      exact={route.exact}
                      key={i + route.path}
                    >
                      {route.compnent}
                    </Route>
                  );
                } else {
                  return <Redirect key={i + route.path} to='/login' />;
                }
              })}
            </Switch>
          </Layout>
        </SWRConfig>
      </div>
    </BrowserRouter>
  );
};

export default MyApp;
