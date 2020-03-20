import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
//constants
import Colors from '../../constants/Colors';
//components
import CartItem from './CartItem';

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: '#000',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888'
  }
});

const OrderItem = ({ amount, date }) => (
  <View style={styles.orderItem}>
    <View style={styles.summary}>
      <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
    <Button title="Show Details" color={Colors.primary} />
  </View>
);

export default OrderItem;
