import React from 'react';
//stack navigator
import { createStackNavigator } from '@react-navigation/stack';
//helpers
import { defaultNavOptions, headerButtonIcon } from './Helpers';
//screens
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => (
  <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <ProductsStackNavigator.Screen
      name="ProductsOverview"
      component={ProductsOverviewScreen}
      options={({ navigation: { navigate, toggleDrawer } }) => ({
        headerTitle: 'All Products',
        headerLeft: () =>
          headerButtonIcon({
            onPressHandler: toggleDrawer,
            icon: 'menu',
            buttonTitle: 'Menu',
          }),
        headerRight: () =>
          headerButtonIcon({
            onPressHandler: () => navigate('Cart'),
            icon: 'cart',
            buttonTitle: 'Cart',
          }),
      })}
    />
    <ProductsStackNavigator.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={({ route: { params } }) => ({
        headerTitle: params ? params.productTitle : '',
      })}
    />
    <ProductsStackNavigator.Screen
      name="Cart"
      component={CartScreen}
      options={{ headerTitle: 'Your Cart' }}
    />
  </ProductsStackNavigator.Navigator>
);
