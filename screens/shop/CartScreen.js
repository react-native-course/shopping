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
import Card from '../../components/UI/Card';

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
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
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={transformedCartItems.length === 0}
          onPress={() =>
            dispatch(addOrder({ cartItems: transformedCartItems, totalAmount }))
          }
        />
      </Card>
      <FlatList
        data={transformedCartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => {
          const {
            item: { productId, quantity, productTitle, sum }
          } = itemData;
          return (
            <CartItem
              quantity={quantity}
              title={productTitle}
              amount={sum}
              deletable
              onRemove={() => dispatch(removeFromCart(productId))}
            />
          );
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  items: getCartItems({ state }),
  totalAmount: getCartTotalAmount({ state })
});

export default connect(mapStateToProps)(CartScreen);
