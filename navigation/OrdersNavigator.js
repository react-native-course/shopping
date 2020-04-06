import React from 'react';
//stack navigator
import { createStackNavigator } from '@react-navigation/stack';
//helpers
import { defaultNavOptions, headerButtonIcon } from './Helpers';
//screens
import OrdersScreen from '../screens/shop/OrdersScreen';

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => (
  <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <OrdersStackNavigator.Screen
      name="orders"
      component={OrdersScreen}
      options={({ navigation: { toggleDrawer } }) => ({
        headerTitle: 'Your Orders',
        headerLeft: () =>
          headerButtonIcon({
            onPressHandler: toggleDrawer,
            icon: 'menu',
            buttonTitle: 'Menu',
          }),
      })}
    />
  </OrdersStackNavigator.Navigator>
);
