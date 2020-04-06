import React from 'react';
//stack navigator
import { createStackNavigator } from '@react-navigation/stack';
//helpers
import { defaultNavOptions } from './Helpers';
//screens
import AuthScreen from '../screens/user/AuthScreen';

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => (
  <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <AuthStackNavigator.Screen
      name="Auth"
      component={AuthScreen}
      options={{ headerTitle: 'Authenticate' }}
    />
  </AuthStackNavigator.Navigator>
);
