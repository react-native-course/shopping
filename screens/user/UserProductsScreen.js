import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, Button, Alert, Text } from 'react-native';
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
import CenteredWrapper from '../../components/UI/CenteredWrapper';

const UserProductsScreen = ({
  navigation: { navigate }
}) => {
  const userProducts = useSelector(state => getUserProducts({ state })),
        adminErrorMessage = useSelector(state => getAdminErrorMessage({ state })),
        dispatch = useDispatch(),
        [isLoading, setIsLoading] = useState(false);

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
          if (adminErrorMessage) {
            dispatch(resetAdminErrorMessage());
          }
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

  //show a message if no products
  if (userProducts.length === 0) {
    return (
      <CenteredWrapper>
        <Text>No products found, mayby start creating some?</Text>
      </CenteredWrapper>
    );
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

export default UserProductsScreen;
