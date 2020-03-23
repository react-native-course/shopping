import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const ProductsOverviewScreen = ({
  availableProducts,
  errorMessage,
  navigation: { navigate },
  dispatch
}) => {
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const selectItemHandler = ({ id, title }) => {
    navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };

  if (errorMessage) {
    return (
      <View style={styles.centered}>
        <Text>{errorMessage}!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && availableProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found, Maybe start adding some!</Text>
      </View>
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
