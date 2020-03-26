import { combineReducers } from 'redux';
import productsReducer from './reducers/productsReducer';
import cartReducer from './reducers/cartReducer';
import ordersReducer from './reducers/ordersReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  productsReducer,
  cartReducer,
  ordersReducer,
  authReducer
});

export default rootReducer;
