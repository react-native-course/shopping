//action types
import {
  AUTHENTICATE,
  LOGOUT,
  SET_DID_TRY_AL,
  SET_AUTH_ERROR_MESSAGE,
  RESET_AUTH_ERROR_MESSAGE,
} from '../actionTypes';
//utilities
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
  errorMessage: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE: {
      const { token, userId } = action;
      return updateObject(state, { token, userId, didTryAutoLogin: true });
    }
    case LOGOUT: {
      return updateObject(initialState, { didTryAutoLogin: true });
    }
    case SET_DID_TRY_AL: {
      return updateObject(state, { didTryAutoLogin: true });
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
