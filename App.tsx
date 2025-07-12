import React from 'react';
import { Provider } from 'react-redux';
import { AppNavigator } from './src/AppNavigator';
import InitLoader from './src/screens/InitLoader';
import { store } from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <InitLoader>
        <AppNavigator />
      </InitLoader>
    </Provider>
  );
}
