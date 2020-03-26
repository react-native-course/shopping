//react navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
//stack navigator
import { createStackNavigator } from 'react-navigation-stack';
//app navigators
import { ShopNavigator } from './ShopNavigator';
//helpers
import { defaultNavOptions } from './Helpers';
//screens
import AuthScreen from '../screens/user/AuthScreen';

const AuthNavigator = createStackNavigator(
  {
    Auth: {
      screen: AuthScreen,
      navigationOptions: {
        title: 'Authenticate'
      }
    }
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);
