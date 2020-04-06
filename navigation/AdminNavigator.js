import React from 'react';
//stack navigator
import { createStackNavigator } from '@react-navigation/stack';
//helpers
import { defaultNavOptions, headerButtonIcon } from './Helpers';
//screens
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => (
  <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <AdminStackNavigator.Screen
      name="UserProducts"
      component={UserProductsScreen}
      options={({ navigation: { toggleDrawer, navigate } }) => ({
        title: 'Your Products',
        headerLeft: () =>
          headerButtonIcon({
            onPressHandler: toggleDrawer,
            icon: 'menu',
            buttonTitle: 'Menu',
          }),
        headerRight: () =>
          headerButtonIcon({
            onPressHandler: () => navigate('EditProduct'),
            icon: 'add',
            buttonTitle: 'Add',
          }),
      })}
    />
    <AdminStackNavigator.Screen
      name="EditProduct"
      component={EditProductScreen}
      options={({ route: { params } }) => {
        const routeParams = params ? params : {};
        return {
          title: routeParams.productId ? 'Edit Product' : 'Add Product',
        };
      }}
    />
  </AdminStackNavigator.Navigator>
);
