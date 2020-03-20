import React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
//selectors
import {
  getCartItems,
  getCartTotalAmount
} from '../../store/selectors/cartSelectors';
//actions
import { removeFromCart } from '../../store/actions/cartActions';
import { addOrder } from '../../store/actions/ordersActions';
//constants
import Colors from '../../constants/Colors';
//components
import CartItem from '../../components/shop/CartItem';

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

const CartScreen = ({ items, totalAmount, dispatch }) => {
  const transformedCartItems = [];
  for (const key in items) {
    transformedCartItems.push({
      productId: key,
      productTitle: items[key].productTitle,
      productPrice: items[key].productPrice,
      quantity: items[key].quantity,
      sum: items[key].sum
    });
  }
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={transformedCartItems.length === 0}
          onPress={() =>
            dispatch(addOrder({ cartItems: transformedCartItems, totalAmount }))
          }
        />
      </View>
      <FlatList
        data={transformedCartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => dispatch(removeFromCart(itemData.item.productId))}
          />
        )}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  items: getCartItems({ state }),
  totalAmount: getCartTotalAmount({ state })
});

export default connect(mapStateToProps)(CartScreen);
