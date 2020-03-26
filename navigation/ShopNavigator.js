//react navigation
import { createAppContainer } from 'react-navigation';
//stack navigator
import { createStackNavigator } from 'react-navigation-stack';
//drawer navigator
import { createDrawerNavigator } from 'react-navigation-drawer';
//constants
import Colors from '../constants/Colors';
//helpers
import { defaultNavOptions, headerButtonIcon, setDrawerIcon } from './Helpers';
//components
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

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
