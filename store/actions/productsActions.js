//action types
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS
} from '../actionTypes';
//services
import ProductsService from '../../services/ProductsService';
//models
import Product from '../../models/product';

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
    console.log(err.response);
  }
};

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  pid: productId
});

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
    console.log(err.response);
  }
};

export const updateProduct = ({ id, title, description, imageUrl }) => ({
  type: UPDATE_PRODUCT,
  pid: id,
  productData: {
    title,
    description,
    imageUrl
  }
});
