//action types
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_ORDER,
  DELETE_PRODUCT
} from '../actionTypes';
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
    case ADD_TO_CART: {
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
    }
    case REMOVE_FROM_CART: {
      const updatedCartItems = { ...state.items },
        selectedCartItem = updatedCartItems[action.pid];

      if (selectedCartItem.quantity > 1) {
        //reduce quantity
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems[action.pid] = updatedCartItem;
      } else {
        delete updatedCartItems[action.pid];
      }
      return updateObject(state, {
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      });
    }
    case ADD_ORDER: {
      return initialState;
    }
    case DELETE_PRODUCT: {
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.items },
        itemTotal = updatedItems[action.pid].sum;

      delete updatedItems[action.pid];

      return updateObject(state, {
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal
      });
    }
    default:
      return state;
  }
};

export default reducer;
