import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AsyncStorage } from 'react-native';
//actions
import { authenticate, setDidTryAl } from '../store/actions/authActions';
//components
import LoadingIcon from '../components/UI/LoadingIcon';

const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) {
          dispatch(setDidTryAl());
          return;
        }
        const transformedData = JSON.parse(userData),
          { token, userId, expiryDate } = transformedData,
          expirationDate = new Date(expiryDate);

        if (expirationDate <= new Date() || !token || !userId) {
          dispatch(setDidTryAl());
          return;
        }

        const expirationTime = expirationDate.getTime() - new Date().getTime();
        dispatch(authenticate({ token, userId, expiryTime: expirationTime }));
      } catch (err) {}
    };
    tryLogin();
  }, []);

  return <LoadingIcon />;
};

export default StartupScreen;
