//action types
import {
  SET_ORDERS,
  ADD_ORDER,
  SET_ORDERS_ERROR_MESSAGE,
  RESET_ORDERS_ERROR_MESSAGE
} from '../actionTypes';
//selectors
import { getAuthToken } from '../selectors/authSelectors';
//services
import OrdersService from '../../services/OrdersService';
//models
import Order from '../../models/order';

const setOrdersErrorMessage = (error) => ({
  type: SET_ORDERS_ERROR_MESSAGE,
  error
});

export const resetOrdersErrorMessage = () => ({
  type: RESET_ORDERS_ERROR_MESSAGE
});

export const fetchOrders = () => async (dispatch) => {
  try {
    const res = await OrdersService.getOrders('u1'),
      loadedOrders = [];

    for (const [key, value] of Object.entries(res.data)) {
      loadedOrders.push(
        new Order(key, value.cartItems, value.totalAmount, new Date(value.date))
      );
    }
    dispatch({ type: SET_ORDERS, orders: loadedOrders });
  } catch (err) {
    dispatch(setOrdersErrorMessage(err.response.data));
  }
};

export const addOrder = ({ cartItems, totalAmount }) => async (
  dispatch,
  getState
) => {
  const state = getState(),
    token = getAuthToken({ state });
  try {
    const date = new Date(),
      res = await OrdersService.createOrder({
        userId: 'u1',
        cartItems,
        totalAmount,
        date: date.toISOString(),
        token
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
  }
};
