import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const CenteredWrapper = ({ children }) => (
  <View style={styles.centered}>{children}</View>
);

export default CenteredWrapper;
