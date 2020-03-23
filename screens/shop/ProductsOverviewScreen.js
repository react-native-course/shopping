import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FlatList, Button } from 'react-native';
//selectors
import { getAvailableProducts } from '../../store/selectors/productsSelectors';
//actions
import { addToCart } from '../../store/actions/cartActions';
import { fetchProducts } from '../../store/actions/productsActions';
//constants
import Colors from '../../constants/Colors';
//components
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = ({
  availableProducts,
  navigation: { navigate },
  dispatch
}) => {
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const selectItemHandler = ({ id, title }) => {
    navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };

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
  availableProducts: getAvailableProducts({ state })
});

export default connect(mapStateToProps)(ProductsOverviewScreen);
