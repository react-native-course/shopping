//action types
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
  SET_PRODUCTS_ERROR_MESSAGE,
  RESET_PRODUCTS_ERROR_MESSAGE,
  SET_ADMIN_ERROR_MESSAGE,
  RESET_ADMIN_ERROR_MESSAGE
} from '../actionTypes';
//services
import ProductsService from '../../services/ProductsService';
//models
import Product from '../../models/product';

const setProductsErrorMessage = (error) => ({
  type: SET_PRODUCTS_ERROR_MESSAGE,
  error
});

export const resetProductsErrorMessage = () => ({
  type: RESET_PRODUCTS_ERROR_MESSAGE
});

const setAdminErrorMessage = (error) => ({
  type: SET_ADMIN_ERROR_MESSAGE,
  error
});

export const resetAdminErrorMessage = () => ({
  type: RESET_ADMIN_ERROR_MESSAGE
});

export const fetchProducts = () => async (dispatch) => {
  try {
    const res = await ProductsService.getProducts(),
      loadedProducts = [];

    for (const [key, value] of Object.entries(res.data)) {
      loadedProducts.push(
        new Product(
          key,
          'u1',
          value.title,
          value.imageUrl,
          value.description,
          value.price
        )
      );
    }
    dispatch({ type: SET_PRODUCTS, products: loadedProducts });
  } catch (err) {
    dispatch(setProductsErrorMessage(err.response.data));
  }
};

export const createProduct = ({
  title,
  description,
  imageUrl,
  price
}) => async (dispatch) => {
  try {
    const res = await ProductsService.createProduct({
      title,
      description,
      imageUrl,
      price
    });

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: res.data.name,
        title,
        description,
        imageUrl,
        price
      }
    });
  } catch (err) {
    dispatch(setAdminErrorMessage(err.response.data));
    throw new Error(err.response.data);
  }
};

export const updateProduct = ({ id, title, description, imageUrl }) => async (
  dispatch
) => {
  try {
    await ProductsService.updateProduct({
      id,
      title,
      description,
      imageUrl
    });

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl
      }
    });
  } catch (err) {
    dispatch(setAdminErrorMessage(err.response.data));
    throw new Error(err.response.data);
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    await ProductsService.deleteProduct(productId);
    dispatch({
      type: DELETE_PRODUCT,
      pid: productId
    });
  } catch (err) {
    dispatch(setAdminErrorMessage(err.response.data));
  }
};
