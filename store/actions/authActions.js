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
    dispatch(setAuthErrorMessage(err.response.data));
  }
};

export const signin = ({ email, password }) => async (dispatch) => {
  try {
    const res = await AuthService.signInUser({ email, password });
    dispatch({ type: SIGNIN });
  } catch (err) {
    dispatch(setAuthErrorMessage(err.response.data));
  }
};
