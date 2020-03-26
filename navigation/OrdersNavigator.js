//stack navigator
import { createStackNavigator } from 'react-navigation-stack';
//helpers
import { defaultNavOptions, headerButtonIcon } from './Helpers';
//screens
import OrdersScreen from '../screens/shop/OrdersScreen';

export const OrdersNavigator = createStackNavigator(
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
