import { ADD_ORDER } from '../actionTypes';
import OrdersService from '../../services/OrdersService';

export const addOrder = ({ cartItems, totalAmount }) => async (dispatch) => {
  try {
    const date = new Date(),
      res = await OrdersService.createOrder({
        userId: 'u1',
        cartItems,
        totalAmount,
        date: date.toISOString()
      });
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: res.data.name,
        items: cartItems,
        amount: totalAmount,
        date
      }
    });
  } catch (err) {
    throw new Error(err.response.data);
  }
};
