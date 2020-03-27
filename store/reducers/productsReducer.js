//action types
import {
  SET_PRODUCTS,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS_ERROR_MESSAGE,
  RESET_PRODUCTS_ERROR_MESSAGE,
  SET_ADMIN_ERROR_MESSAGE,
  RESET_ADMIN_ERROR_MESSAGE
} from '../actionTypes';
//utilities
import { updateObject } from '../utility';
//models
import Product from '../../models/product';

const initialState = {
  availableProducts: [],
  userProducts: [],
  errorMessage: '',
  adminErrorMessage: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      const { products, userProducts } = action;
      return updateObject(state, {
        availableProducts: products,
        userProducts
      });
    }
    case CREATE_PRODUCT: {
      const {
          productData: { id, title, imageUrl, description, price, ownerId }
        } = action,
        newProduct = new Product(
          id,
          ownerId,
          title,
          imageUrl,
          description,
          price
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
    case DELETE_PRODUCT: {
      return updateObject(state, {
        userProducts: state.userProducts.filter((el) => el.id !== action.pid),
        availableProducts: state.availableProducts.filter(
          (el) => el.id !== action.pid
        )
      });
    }
    case SET_PRODUCTS_ERROR_MESSAGE: {
      return updateObject(state, { errorMessage: action.error });
    }
    case RESET_PRODUCTS_ERROR_MESSAGE: {
      return updateObject(state, { errorMessage: '' });
    }
    case SET_ADMIN_ERROR_MESSAGE: {
      return updateObject(state, { adminErrorMessage: action.error });
    }
    case RESET_ADMIN_ERROR_MESSAGE: {
      return updateObject(state, {
        adminErrorMessage: initialState.adminErrorMessage
      });
    }
    default:
      return state;
  }
};

export default reducer;
