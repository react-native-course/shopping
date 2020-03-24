import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
//selectors
import {
  getAvailableProducts,
  getProductsErrorMessage
} from '../../store/selectors/productsSelectors';
//actions
import { addToCart } from '../../store/actions/cartActions';
import {
  fetchProducts,
  resetProductsErrorMessage
} from '../../store/actions/productsActions';
//constants
import Colors from '../../constants/Colors';
//components
import ProductItem from '../../components/shop/ProductItem';
import CenteredWrapper from '../../components/UI/CenteredWrapper';
import LoadingIcon from '../../components/UI/LoadingIcon';

const ProductsOverviewScreen = ({
  availableProducts,
  errorMessage,
  navigation: { navigate, addListener },
  dispatch
}) => {
  const [isLoading, setIsLoading] = useState(false);

  //fetch products from the backend
  const loadProducts = useCallback(async () => {
    dispatch(resetProductsErrorMessage());
    setIsLoading(true);
    try {
      await dispatch(fetchProducts());
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  //add event listener on navigation
  useEffect(() => {
    const willFocusSub = addListener('willFocus', loadProducts);

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  //fetch products component did mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  //select a product to read the details
  const selectItemHandler = ({ id, title }) => {
    navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };

  //if there is an HTTP request error show the error
  if (errorMessage) {
    return (
      <CenteredWrapper>
        <Text>{errorMessage}!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </CenteredWrapper>
    );
  }

  //if http reqest is running show a spinner
  if (isLoading) {
    return (
      <CenteredWrapper>
        <LoadingIcon />
      </CenteredWrapper>
    );
  }

  //if no products show a message
  if (!isLoading && availableProducts.length === 0) {
    return (
      <CenteredWrapper>
        <Text>No products found, Maybe start adding some!</Text>
      </CenteredWrapper>
    );
  }
  return (
    <FlatList
      data={availableProducts}
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
            onSelect={() => {
              selectItemHandler({
                id: id,
                title: title
              });
            }}
          >
            <Button
              title="View Details"
              onPress={() => {
                selectItemHandler({
                  id: id,
                  title: title
                });
              }}
              color={Colors.primary}
            />
            <Button
              title="To Cart"
              onPress={() => {
                dispatch(addToCart(itemData.item));
              }}
              color={Colors.primary}
            />
          </ProductItem>
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  availableProducts: getAvailableProducts({ state }),
  errorMessage: getProductsErrorMessage({ state })
});

export default connect(mapStateToProps)(ProductsOverviewScreen);
