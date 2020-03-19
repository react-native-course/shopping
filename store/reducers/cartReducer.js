//action types
import { ADD_TO_CART } from '../actionTypes';
//models
import CartItem from '../../models/cart-item';
//utilities
import { updateObject } from '../utility';

const initialState = {
  items: {},
  totalAmount: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { price, title, id } = action.product;
      let updatedOrNewCartItem;

      if (state.items[id]) {
        //already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[id].quantity + 1,
          price,
          title,
          state.items[id].sum + price
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, price, title, price);
      }
      return updateObject(state, {
        items: {
          ...state.items,
          [id]: updatedOrNewCartItem
        },
        totalAmount: state.totalAmount + price
      });
    default:
      return state;
  }
};

export default reducer;
