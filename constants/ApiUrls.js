//configuration
import { APP_CONFIG } from '../services/Config';

export const BASE_URL = APP_CONFIG.API.base;

//products
const PRODUCTS_URL = '/products';
export const getProductsUrl = () => `${BASE_URL}${PRODUCTS_URL}.json`;
