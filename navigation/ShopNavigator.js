//react native
import {Platform} from 'react-native';
//react navigation
import {createAppContainer} from 'react-navigation';
//stack navigator
import {createStackNavigator} from 'react-navigation-stack';
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
//constants
import Colors from "../constants/Colors";

const ProductNavigator = createStackNavigator({
        ProductsOverview: ProductsOverviewScreen,
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
            },
            headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primary,
        }
    });

export default createAppContainer(ProductNavigator)
