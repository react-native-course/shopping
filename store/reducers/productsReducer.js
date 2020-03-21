//dummy data
import PRODUCTS from '../../data/dummy-data';
//action types
import { DELETE_PRODUCT } from '../actionTypes';
//utilities
import { updateObject } from '../utility';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1')
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT: {
      return updateObject(state, {
        userProducts: state.userProducts.filter((el) => el.id !== action.pid),
        availableProducts: state.availableProducts.filter(
          (el) => el.id !== action.pid
        )
      });
    }
    default:
      return state;
  }
};

export default reducer;
