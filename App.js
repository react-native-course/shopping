import React, { useState } from 'react';
//redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
//fonts
import { loadAsync } from 'expo-font';
import { AppLoading } from 'expo';
//components
import NavigationContainer from './navigation/NavigationContainer';

const store = configureStore();

const fetchFonts = () => {
  return loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
