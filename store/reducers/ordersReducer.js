import { ADD_ORDER } from '../actionTypes';
//models
import Order from '../../models/order';
//utilities
import { updateObject } from '../utility';

const initialState = {
  orders: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER: {
      const {
        orderData: { items, amount }
      } = action;
      const newOrder = new Order(
        new Date().toString(),
        items,
        amount,
        new Date()
      );
      return updateObject(state, { orders: state.orders.concat(newOrder) });
    }
    default:
      return state;
  }
};

export default reducer;
