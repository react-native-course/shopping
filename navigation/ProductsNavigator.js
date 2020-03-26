//stack navigator
import { createStackNavigator } from 'react-navigation-stack';
//helpers
import { defaultNavOptions, headerButtonIcon } from './Helpers';
//screens
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';

export const ProductsNavigator = createStackNavigator(
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
