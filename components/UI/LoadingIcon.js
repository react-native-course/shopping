import React from 'react';
import { ActivityIndicator } from 'react-native';
//constants
import Colors from '../../constants/Colors';
//components
import CenteredWrapper from './CenteredWrapper';

const LoadingIcon = () => (
  <CenteredWrapper>
    <ActivityIndicator size="large" color={Colors.primary} />
  </CenteredWrapper>
);

export default LoadingIcon;
