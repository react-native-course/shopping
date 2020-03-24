import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FlatList, Button, Alert } from 'react-native';
//selectors
import {
  getUserProducts,
  getAdminErrorMessage
} from '../../store/selectors/productsSelectors';
//actions
import {
  deleteProduct,
  resetAdminErrorMessage
} from '../../store/actions/productsActions';
//constants
import Colors from '../../constants/Colors';
//components
import ProductItem from '../../components/shop/ProductItem';
import LoadingIcon from '../../components/UI/LoadingIcon';

const UserProductsScreen = ({
  userProducts,
  adminErrorMessage,
  dispatch,
  navigation: { navigate }
}) => {
  const [isLoading, setIsLoading] = useState(false);

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

  //navigate to edit screen to edit a product
  const editProductHandler = (id) => {
    navigate('EditProduct', { productId: id });
  };

  const deleteProductHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          dispatch(resetAdminErrorMessage());
          setIsLoading(true);
          try {
            await dispatch(deleteProduct(id));
            setIsLoading(false);
          } catch (err) {
            setIsLoading(false);
          }
        }
      }
    ]);
  };

  //show loading icon if loading
  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        const {
          item: { id, imageUrl, title, price }
        } = itemData;

        return (
          <ProductItem
            image={imageUrl}
            title={title}
            price={price}
            onSelect={() => editProductHandler(id)}
          >
            <Button
              title="Edit"
              onPress={() => editProductHandler(id)}
              color={Colors.primary}
            />
            <Button
              title="Delete"
              onPress={() => deleteProductHandler(id)}
              color={Colors.primary}
            />
          </ProductItem>
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  userProducts: getUserProducts({ state }),
  adminErrorMessage: getAdminErrorMessage({ state })
});

export default connect(mapStateToProps)(UserProductsScreen);
