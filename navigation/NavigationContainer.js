import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
//navigation
import MainNavigator from './MainNavigator';
//selectors
import { getAuthToken } from '../store/selectors/authSelectors';

const NavigationContainer = ({ token }) => {
  const navRef = useRef();

  useEffect(() => {
    if (!token) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: 'Auth' })
      );
    }
  }, [token]);

  return <MainNavigator ref={navRef} />;
};

const mapStateToProps = (state) => ({
  token: getAuthToken({ state })
});

export default connect(mapStateToProps)(NavigationContainer);
