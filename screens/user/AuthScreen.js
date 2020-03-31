import React, { useReducer, useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
//linear gradient
import { LinearGradient } from 'expo-linear-gradient';
//selectors
import { getAuthErrorMessage } from '../../store/selectors/authSelectors';
//actions
import {
  signup,
  signin,
  resetAuthErrorMessage
} from '../../store/actions/authActions';
//components
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

//action type for formReducer
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

//formReducer for product inputs
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = ({ errorMessage, navigation: { navigate }, dispatch }) => {
  const [isSignup, setIsSignup] = useState(false),
    [isLoading, setIsLoading] = useState(false);
  //form state
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  //change handler for form inputs
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (errorMessage) {
      Alert.alert('An Error Occurred!', errorMessage, [{ text: 'Okay' }]);
    }
  }, [errorMessage]);

  const authHandler = async () => {
    if (errorMessage) {
      dispatch(resetAuthErrorMessage());
    }
    setIsLoading(true);
    try {
      if (isSignup) {
        await dispatch(
          signup({
            email: formState.inputValues.email,
            password: formState.inputValues.password
          })
        );
      } else {
        await dispatch(
          signin({
            email: formState.inputValues.email,
            password: formState.inputValues.password
          })
        );
      }
      setIsLoading(false);
      navigate('Shop');
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      KeyboardAvoidingView={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView keyboardShouldPersistTaps="always">
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              required
              minLength={5}
              secureTextEntry
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={`Sign ${isSignup ? 'Up' : 'In'}`}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to Sign ${!isSignup ? 'Up' : 'In'}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => ({
  errorMessage: getAuthErrorMessage({ state })
});

export default connect(mapStateToProps)(AuthScreen);
