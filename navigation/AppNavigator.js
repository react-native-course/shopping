import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
//react navigation
import { NavigationContainer } from '@react-navigation/native';
//navigation
import { OrdersNavigator } from './OrdersNavigator';
import { ShopNavigator } from './ShopNavigator';
import { AuthNavigator } from './AuthNavigator';
//selectors
import {
  getAuthToken,
  getDidTryAutoLogin,
} from '../store/selectors/authSelectors';
//screens
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = () => {
  const isAuth = useSelector((state) => !!getAuthToken({ state })),
    didTryAutoLogin = useSelector((state) => getDidTryAutoLogin({ state }));

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
