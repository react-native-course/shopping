//configuration
import { APP_CONFIG } from '../services/Config';

export const BASE_URL = APP_CONFIG.API.base;

//products
const PRODUCTS_URL = '/products';
export const getProductsUrl = () => `${BASE_URL}${PRODUCTS_URL}.json`;
export const getProductUrl = (id) => `${BASE_URL}${PRODUCTS_URL}/${id}.json`;

//orders
const ORDERS_URL = '/orders';
export const getOrdersUrl = () => `${BASE_URL}${ORDERS_URL}.json`;
export const getCreateOrderUrl = (userId) =>
  `${BASE_URL}${ORDERS_URL}/${userId}.json`;
