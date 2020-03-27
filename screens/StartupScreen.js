import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
//actions
import { authenticate } from '../store/actions/authActions';
//components
import LoadingIcon from '../components/UI/LoadingIcon';

const StartupScreen = ({ navigation: { navigate }, dispatch }) => {
  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) {
          navigate('Auth');
          return;
        }
        const transformedData = JSON.parse(userData),
          { token, userId, expiryDate } = transformedData,
          expirationDate = new Date(expiryDate);

        if (expirationDate <= new Date() || !token || !userId) {
          navigate('Auth');
          return;
        }

        const expirationTime = expirationDate.getTime() - new Date().getTime();
        navigate('Shop');
        dispatch(authenticate({ token, userId, expiryTime: expirationTime }));
      } catch (err) {}
    };
    tryLogin();
  }, []);

  return <LoadingIcon />;
};

export default connect()(StartupScreen);
