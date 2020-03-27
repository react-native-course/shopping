//async storage for storing data on the current device
import { AsyncStorage } from 'react-native';
//action types
import {
  AUTHENTICATE,
  LOGOUT,
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

export const authenticate = ({ userId, token }) => ({
  type: AUTHENTICATE,
  userId,
  token
});

export const signup = ({ email, password }) => async (dispatch) => {
  try {
    const res = await AuthService.signUpUser({ email, password });
    dispatch(
      authenticate({ token: res.data.idToken, userId: res.data.localId })
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(res.data.expiresIn) * 1000
    );
    saveDataToStorage({
      token: res.data.idToken,
      userId: res.data.localId,
      expirationDate
    });
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
    dispatch(
      authenticate({ token: res.data.idToken, userId: res.data.localId })
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(res.data.expiresIn) * 1000
    );
    saveDataToStorage({
      token: res.data.idToken,
      userId: res.data.localId,
      expirationDate
    });
  } catch (err) {
    if (typeof err.response.data === 'string') {
      dispatch(setAuthErrorMessage(err.response.data));
    } else {
      dispatch(setAuthErrorMessage(err.response.data.error.message));
    }
  }
};

export const logout = () => ({ type: LOGOUT });

const saveDataToStorage = ({ token, userId, expirationDate }) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({ token, userId, expiryDate: expirationDate.toISOString() })
  );
};
