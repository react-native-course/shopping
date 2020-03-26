//react navigation
import { createAppContainer } from 'react-navigation';
//drawer navigator
import { createDrawerNavigator } from 'react-navigation-drawer';
//constants
import Colors from '../constants/Colors';
//helpers
import { setDrawerIcon } from './Helpers';
//navigators
import { ProductsNavigator } from './ProductsNavigator';
import { ordersNavigator } from './OrdersNavigator';
import { AdminNavigator } from './AdminNavigator';

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
