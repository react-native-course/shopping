//action types
import {
  SIGNUP,
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
  console.log('signup', email, password);
  try {
    const res = await AuthService.signUpUser({ email, password });
    console.log(res.data);
    dispatch({ type: SIGNUP });
  } catch (err) {
    dispatch(setAuthErrorMessage(err.response.data));
  }
};
