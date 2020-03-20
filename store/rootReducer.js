import { combineReducers } from 'redux';
import productsReducer from './reducers/productsReducer';
import cartReducer from './reducers/cartReducer';
import ordersReducer from './reducers/ordersReducer';

const rootReducer = combineReducers({
  productsReducer,
  cartReducer,
  ordersReducer
});

export default rootReducer;
