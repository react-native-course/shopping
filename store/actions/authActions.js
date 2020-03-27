//action types
import {
  SIGNUP,
  SIGNIN,
  SET_AUTH_ERROR_MESSAGE,
  RESET_AUTH_ERROR_MESSAGE
} from '../actionTypes';
//services
import AuthService from '../../services/AuthService';

const setAuthErrorMessage = (error) => ({
  type: SET_AUTH_ERROR_MESSAGE,
  error
});

export const resetAuthErrorMessage = () => ({ type: RESET_AUTH_ERROR_MESSAGE });

export const signup = ({ email, password }) => async (dispatch) => {
  try {
    const res = await AuthService.signUpUser({ email, password });
    dispatch({ type: SIGNUP });
  } catch (err) {
    if (typeof err.response.data === 'string') {
      dispatch(setAuthErrorMessage(err.response.data));
    } else {
      dispatch(setAuthErrorMessage(err.response.data.error.message));
    }
  }
};

export const signin = ({ email, password }) => async (dispatch) => {
  try {
    const res = await AuthService.signInUser({ email, password });
    dispatch({ type: SIGNIN });
  } catch (err) {
    if (typeof err.response.data === 'string') {
      dispatch(setAuthErrorMessage(err.response.data));
    } else {
      dispatch(setAuthErrorMessage(err.response.data.error.message));
    }
  }
};
