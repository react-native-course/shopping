import React from 'react';
//react native
import { Platform } from 'react-native';
//react navigation
import { createAppContainer } from 'react-navigation';
//stack navigator
import { createStackNavigator } from 'react-navigation-stack';
//drawer navigator
import { createDrawerNavigator } from 'react-navigation-drawer';
//header buttons
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//icons
import { Ionicons } from '@expo/vector-icons';
//constants
import Colors from '../constants/Colors';
//components
import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

//==============helpers==============
//default options for stack navigators
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

//header button icon
const headerButtonIcon = ({ onPressHandler, icon, buttonTitle }) => (
  <HeaderButtons
    HeaderButtonComponent={CustomHeaderButton}
    title={`${buttonTitle} content`}
  >
    <Item
      title={buttonTitle}
      label={buttonTitle}
      iconName={Platform.OS === 'android' ? `md-${icon}` : `ios-${icon}`}
      onPress={() => onPressHandler()}
    />
  </HeaderButtons>
);

//icon for the drawer label
const setDrawerIcon = ({ drawerConfig, iconName }) => (
  <Ionicons
    name={Platform.OS === 'android' ? `md-${iconName}` : `ios-${iconName}`}
    size={23}
    color={drawerConfig.tintColor}
  />
);

//==============navigators==============
//products stack navigator
const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: {
      screen: ProductsOverviewScreen,
      navigationOptions: ({ navigation: { navigate, toggleDrawer } }) => ({
        title: 'All Products',
        headerLeft: headerButtonIcon({
          onPressHandler: toggleDrawer,
          icon: 'menu',
          buttonTitle: 'Menu'
        }),
        headerRight: headerButtonIcon({
          onPressHandler: () => navigate('Cart'),
          icon: 'cart',
          buttonTitle: 'Cart'
        })
      })
    },
    ProductDetail: {
      screen: ProductDetailScreen,
      navigationOptions: ({ navigation: { getParam } }) => ({
        title: getParam('productTitle')
      })
    },
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

//orders stack navigator
const ordersNavigator = createStackNavigator(
  {
    orders: {
      screen: OrdersScreen,
      navigationOptions: ({ navigation: { toggleDrawer } }) => ({
        title: 'Your Orders',
        headerLeft: headerButtonIcon({
          onPressHandler: toggleDrawer,
          icon: 'menu',
          buttonTitle: 'Menu'
        })
      })
    }
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

//admin stack navigator
const AdminNavigator = createStackNavigator(
  {
    UserProducts: {
      screen: UserProductsScreen,
      navigationOptions: ({ navigation: { toggleDrawer, navigate } }) => ({
        title: 'Your Products',
        headerLeft: headerButtonIcon({
          onPressHandler: toggleDrawer,
          icon: 'menu',
          buttonTitle: 'Menu'
        }),
        headerRight: headerButtonIcon({
          onPressHandler: () => navigate('EditProduct'),
          icon: 'add',
          buttonTitle: 'Add'
        })
      })
    },
    EditProduct: {
      screen: EditProductScreen,
      navigationOptions: ({ navigation: { getParam } }) => ({
        title: getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: headerButtonIcon({
          onPressHandler: getParam('submit'),
          icon: 'checkmark',
          buttonTitle: 'Save'
        })
      })
    }
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

//drawer navigator
const shopNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductsNavigator,
      navigationOptions: {
        drawerIcon: (drawerConfig) =>
          setDrawerIcon({ drawerConfig, iconName: 'cart' })
      }
    },
    Orders: {
      screen: ordersNavigator,
      navigationOptions: {
        drawerIcon: (drawerConfig) =>
          setDrawerIcon({ drawerConfig, iconName: 'list' })
      }
    },
    Admin: {
      screen: AdminNavigator,
      navigationOptions: {
        drawerIcon: (drawerConfig) =>
          setDrawerIcon({ drawerConfig, iconName: 'create' })
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
