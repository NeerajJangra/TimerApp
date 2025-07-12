import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppNavigator } from './src/AppNavigator';
import InitLoader from './src/screens/InitLoader';
import { store } from './src/store/store';
import { setupNotificationChannel } from './src/utils/notifications';

export default function App() {
  useEffect(() => {
    setupNotificationChannel();
  }, []);
  return (
    <Provider store={store}>
      <InitLoader>
        <AppNavigator />
      </InitLoader>
    </Provider>
  );
}
