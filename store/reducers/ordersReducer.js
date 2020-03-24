import {
  SET_ORDERS,
  ADD_ORDER,
  SET_ORDERS_ERROR_MESSAGE,
  RESET_ORDERS_ERROR_MESSAGE
} from '../actionTypes';
//models
import Order from '../../models/order';
//utilities
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  errorMessage: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS: {
      return updateObject(state, { orders: action.orders });
    }
    case ADD_ORDER: {
      const {
        orderData: { id, items, amount, date }
      } = action;
      const newOrder = new Order(id, items, amount, date);
      return updateObject(state, { orders: state.orders.concat(newOrder) });
    }
    case SET_ORDERS_ERROR_MESSAGE: {
      return updateObject(state, { errorMessage: action.error });
    }
    case RESET_ORDERS_ERROR_MESSAGE: {
      return updateObject(state, { errorMessage: initialState.errorMessage });
    }
    default:
      return state;
  }
};

export default reducer;
