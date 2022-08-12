import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from './src/NavigationComponents/RootNavigator';
import { persistor, store } from './src/redux';


export default function App() {
  return (
    <Provider store={store} >
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}
