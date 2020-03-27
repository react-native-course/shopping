import React from 'react';
import { SafeAreaView, View, Button } from 'react-native';
//dispatch
import { useDispatch } from 'react-redux';
//drawer navigator
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
//actions
import { logout } from '../store/actions/authActions';
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
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title="Sign out"
              color={Colors.primary}
              onPress={() => {
                dispatch(logout());
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);
