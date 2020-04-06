import React from 'react';
import { SafeAreaView, View, Button } from 'react-native';
//dispatch
import { useDispatch } from 'react-redux';
//drawer navigator
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
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

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItemList {...props} />
            <Button
              title="Sign out"
              color={Colors.primary}
              onPress={() => {
                dispatch(logout());
              }}
            />
          </SafeAreaView>
        </View>
      )}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: ({ color }) => setDrawerIcon({ color, iconName: 'cart' }),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: ({ color }) => setDrawerIcon({ color, iconName: 'list' }),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: ({ color }) =>
            setDrawerIcon({ color, iconName: 'create' }),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};
