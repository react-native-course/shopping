//drawer navigator
import { createDrawerNavigator } from 'react-navigation-drawer';
//constants
import Colors from '../constants/Colors';
//helpers
import { setDrawerIcon } from './Helpers';
//navigators
import { ProductsNavigator } from './ProductsNavigator';
import { OrdersNavigator } from './OrdersNavigator';
import { AdminNavigator } from './AdminNavigator';

//drawer navigator
export const ShopNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductsNavigator,
      navigationOptions: {
        drawerIcon: (drawerConfig) =>
          setDrawerIcon({ drawerConfig, iconName: 'cart' })
      }
    },
    Orders: {
      screen: OrdersNavigator,
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
