//dummy data
import PRODUCTS from '../../data/dummy-data';
//action types
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../actionTypes';
//utilities
import { updateObject } from '../utility';
//models
import Product from '../../models/product';
import { updateProduct } from '../actions/productsActions';

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
    case CREATE_PRODUCT: {
      const {
          productData: { title, imageUrl, description, price }
        } = action,
        newProduct = new Product(
          new Date().toString(),
          'u1',
          title,
          imageUrl,
          description,
          +price
        );
      return updateObject(state, {
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      });
    }
    case UPDATE_PRODUCT: {
      const {
          productData: { title, imageUrl, description },
          pid
        } = action,
        productIndex = state.userProducts.findIndex((prod) => prod.id === pid),
        availableProductIndex = state.availableProducts.findIndex(
          (prod) => prod.id === pid
        ),
        updatedProduct = new Product(
          pid,
          state.userProducts[productIndex].ownerId,
          title,
          imageUrl,
          description,
          state.userProducts[productIndex].price
        ),
        updatedUserProducts = [...state.userProducts],
        updatedAvailableProducts = [...state.availableProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return updateObject(state, {
        userProducts: updatedUserProducts,
        availableProducts: updatedAvailableProducts
      });
    }
    default:
      return state;
  }
};

export default reducer;
