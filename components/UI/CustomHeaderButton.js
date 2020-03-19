import React from 'react';
import { Platform } from 'react-native';
//header button
import { HeaderButton } from 'react-navigation-header-buttons';
//icons
import { Ionicons } from '@expo/vector-icons';
//colors
import Colors from '../../constants/Colors';

const CustomHeaderButton = (props) => (
  <HeaderButton
    {...props}
    IconComponent={Ionicons}
    iconSize={23}
    color={Platform.OS === 'android' ? 'white' : Colors.primary}
  />
);

export default CustomHeaderButton;
