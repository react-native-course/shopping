import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native';
//icons
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  deleteButton: {
    marginLeft: 20
  }
});

const CartItem = ({ quantity, title, amount, onRemove, deletable }) => (
  <View style={styles.cartItem}>
    <View style={styles.itemData}>
      <Text style={styles.quantity}>{quantity} </Text>
      <Text style={styles.mainText}>{title}</Text>
    </View>
    <View style={styles.itemData}>
      <Text style={styles.mainText}>${amount.toFixed(2)}</Text>
      {deletable && (
        <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default CartItem;
