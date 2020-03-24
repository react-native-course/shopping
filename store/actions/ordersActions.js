import {
  ADD_ORDER,
  SET_ORDERS_ERROR_MESSAGE,
  RESET_ORDERS_ERROR_MESSAGE
} from '../actionTypes';
import OrdersService from '../../services/OrdersService';

const setOrdersErrorMessage = (error) => ({
  type: SET_ORDERS_ERROR_MESSAGE,
  error
});

export const resetOrdersErrorMessage = () => ({
  type: RESET_ORDERS_ERROR_MESSAGE
});

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
    dispatch(setOrdersErrorMessage(err.response.data));
    throw new Error(err.response.data);
  }
};
