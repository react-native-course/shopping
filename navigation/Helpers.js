import React from 'react';
//react native
import { Platform } from 'react-native';
//icons
import { Ionicons } from '@expo/vector-icons';
//header buttons
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//constants
import Colors from '../constants/Colors';
//components
import CustomHeaderButton from '../components/UI/CustomHeaderButton';

//default options for stack navigators
export const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primary
};

//header button icon
export const headerButtonIcon = ({ onPressHandler, icon, buttonTitle }) => (
  <HeaderButtons
    HeaderButtonComponent={CustomHeaderButton}
    title={`${buttonTitle} content`}
  >
    <Item
      title={buttonTitle}
      label={buttonTitle}
      iconName={Platform.OS === 'android' ? `md-${icon}` : `ios-${icon}`}
      onPress={() => onPressHandler()}
    />
  </HeaderButtons>
);

//icon for the drawer label
export const setDrawerIcon = ({ drawerConfig, iconName }) => (
  <Ionicons
    name={Platform.OS === 'android' ? `md-${iconName}` : `ios-${iconName}`}
    size={23}
    color={drawerConfig.tintColor}
  />
);
