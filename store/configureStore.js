import {createStore} from 'redux';
import rootReducer from './rootReducer';

const configureStore = () => createStore(rootReducer);

export default configureStore;
