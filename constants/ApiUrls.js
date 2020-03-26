//configuration
import { APP_CONFIG } from '../services/Config';

//auth
const ACCOUNTS_URL = '/accounts:';
const SIGN_UP_URL = 'signUp';
const SIGN_IN_URL = 'signInWithPassword';
const getFirebaseApiKey = () => `?key=${APP_CONFIG.API_KEY.google}`;
export const getSignUpUrl = () =>
  `${ACCOUNTS_URL}${SIGN_UP_URL}${getFirebaseApiKey()}`;
export const getSignInUrl = () =>
  `${ACCOUNTS_URL}${SIGN_IN_URL}${getFirebaseApiKey()}`;

//products
const PRODUCTS_URL = '/products';
export const getProductsUrl = () => `${PRODUCTS_URL}.json`;
export const getProductUrl = (id) => `${PRODUCTS_URL}/${id}.json`;

//orders
const ORDERS_URL = '/orders';
export const getOrdersUrl = (userId) => `${ORDERS_URL}/${userId}.json`;
