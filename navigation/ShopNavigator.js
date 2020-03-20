import React from 'react';
//react native
import { Platform } from 'react-native';
//react navigation
import { createAppContainer } from 'react-navigation';
//stack navigator
import { createStackNavigator } from 'react-navigation-stack';
//drawer navigator
import { createDrawerNavigator } from 'react-navigation-drawer';
//icons
import { Ionicons } from '@expo/vector-icons';
//constants
import Colors from '../constants/Colors';
//components
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primary
};

const ProductNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        title: 'Your Cart'
      }
    }
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const ordersNavigator = createStackNavigator(
  {
    orders: {
      screen: OrdersScreen,
      navigationOptions: {
        title: 'Your Orders'
      }
    }
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const shopNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductNavigator,
      navigationOptions: {
        drawerIcon: (drawerConfig) => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }
    },
    Orders: {
      screen: ordersNavigator,
      navigationOptions: {
        drawerIcon: (drawerConfig) => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

export default createAppContainer(shopNavigator);
