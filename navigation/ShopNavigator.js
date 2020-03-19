//react native
import { Platform } from 'react-native';
//react navigation
import { createAppContainer } from 'react-navigation';
//stack navigator
import { createStackNavigator } from 'react-navigation-stack';
//constants
import Colors from '../constants/Colors';
//components
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';

const ProductNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    defaultNavigationOptions: {
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
    }
  }
);

export default createAppContainer(ProductNavigator);
