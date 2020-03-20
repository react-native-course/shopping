import { ADD_ORDER } from '../actionTypes';

export const addOrder = ({ cartItems, totalAmount }) => ({
  type: ADD_ORDER,
  orderData: {
    items: cartItems,
    amount: totalAmount
  }
});
