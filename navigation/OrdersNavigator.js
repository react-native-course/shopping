//stack navigator
import { createStackNavigator } from 'react-navigation-stack';
//helpers
import { defaultNavOptions, headerButtonIcon } from './Helpers';
//components
import OrdersScreen from '../screens/shop/OrdersScreen';

export const ordersNavigator = createStackNavigator(
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
