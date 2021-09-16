import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import store from 'store/configStore';
import { StoreProvider } from 'easy-peasy';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:1337';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
