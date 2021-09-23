import React from 'react';
import { useStoreRehydrated } from 'easy-peasy';
import Main from './Main';

const App = () => {
  const isRehydrated = useStoreRehydrated();
  return <>{isRehydrated ? <Main /> : <div>Loading...</div>}</>;
};

export default App;
