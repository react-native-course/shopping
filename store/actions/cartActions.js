import { ADD_TO_CART } from '../actionTypes';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  product
});
