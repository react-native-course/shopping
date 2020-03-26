//action types
import {
  SIGNUP,
  SET_AUTH_ERROR_MESSAGE,
  RESET_AUTH_ERROR_MESSAGE
} from '../actionTypes';
//utilities
import { updateObject } from '../utility';

const initialState = {
  errorMessage: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP: {
      return state;
    }
    case SET_AUTH_ERROR_MESSAGE: {
      return updateObject(state, { errorMessage: action.error });
    }
    case RESET_AUTH_ERROR_MESSAGE: {
      return updateObject(state, { errorMessage: initialState.errorMessage });
    }
    default:
      return state;
  }
};

export default reducer;
