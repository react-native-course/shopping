import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
//selectors
import { getUserProducts } from '../../store/selectors/productsSelectors';
//actions
import {
  createProduct,
  updateProduct
} from '../../store/actions/productsActions';

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});

const EditProductScreen = ({
  navigation: { goBack, getParam, setParams },
  userProducts,
  dispatch
}) => {
  const prodId = getParam('productId'),
    editedProduct = userProducts.find((prod) => prod.id === prodId),
    [title, setTitle] = useState(editedProduct ? editedProduct.title : ''),
    [imageUrl, setImageUrl] = useState(
      editedProduct ? editedProduct.imageUrl : ''
    ),
    [price, setPrice] = useState(''),
    [description, setDescription] = useState(
      editedProduct ? editedProduct.description : ''
    );

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(updateProduct({ id: prodId, title, description, imageUrl }));
    } else {
      dispatch(createProduct({ title, description, imageUrl, price }));
    }
    goBack();
  }, [prodId, title, description, imageUrl, price]);

  useEffect(() => {
    setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={setImageUrl}
          />
        </View>
        {!editedProduct && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  userProducts: getUserProducts({ state })
});

export default connect(mapStateToProps)(EditProductScreen);
