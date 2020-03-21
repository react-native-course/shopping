import { DELETE_PRODUCT } from '../actionTypes';

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  pid: productId
});
