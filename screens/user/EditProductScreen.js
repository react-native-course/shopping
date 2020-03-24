import React, { useEffect, useCallback, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';
//selectors
import {
  getUserProducts,
  getAdminErrorMessage
} from '../../store/selectors/productsSelectors';
//actions
import {
  createProduct,
  updateProduct,
  resetAdminErrorMessage
} from '../../store/actions/productsActions';
//components
import Input from '../../components/UI/Input';
import LoadingIcon from '../../components/UI/LoadingIcon';

const styles = StyleSheet.create({
  form: {
    margin: 20
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

const EditProductScreen = ({
  navigation: { goBack, getParam, setParams },
  userProducts,
  adminErrorMessage,
  dispatch
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const prodId = getParam('productId'),
    editedProduct = userProducts.find((prod) => prod.id === prodId);

  //form state
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false
  });

  //show alert if error
  useEffect(() => {
    if (adminErrorMessage) {
      Alert.alert('An error has occured', adminErrorMessage, [
        { text: 'Okay' }
      ]);
    }
    return () => {
      dispatch(resetAdminErrorMessage());
    };
  }, [adminErrorMessage]);

  //on submit
  const submitHandler = useCallback(async () => {
    //show alert message if the form is not valid
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
    dispatch(resetAdminErrorMessage());
    setIsLoading(true);
    try {
      //if there is a product => dispatch update product action
      if (editedProduct) {
        await dispatch(
          updateProduct({
            id: prodId,
            title: formState.inputValues.title,
            description: formState.inputValues.description,
            imageUrl: formState.inputValues.imageUrl
          })
        );
      }
      //else dispatch create product action
      else {
        await dispatch(
          createProduct({
            title: formState.inputValues.title,
            description: formState.inputValues.description,
            imageUrl: formState.inputValues.imageUrl,
            price: +formState.inputValues.price
          })
        );
      }
      setIsLoading(false);
      goBack();
    } catch (err) {
      setIsLoading(false);
    }
  }, [dispatch, prodId, formState]);

  //pass the submit method to the navigation
  useEffect(() => {
    setParams({ submit: submitHandler });
  }, [submitHandler]);

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

  //show loading icon if loading
  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => ({
  userProducts: getUserProducts({ state }),
  adminErrorMessage: getAdminErrorMessage({ state })
});

export default connect(mapStateToProps)(EditProductScreen);
