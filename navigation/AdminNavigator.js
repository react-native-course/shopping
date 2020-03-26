//stack navigator
import { createStackNavigator } from 'react-navigation-stack';
//helpers
import { defaultNavOptions, headerButtonIcon } from './Helpers';
//screens
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

export const AdminNavigator = createStackNavigator(
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
