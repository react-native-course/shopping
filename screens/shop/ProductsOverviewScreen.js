import React from 'react';
import { connect } from 'react-redux';
import { FlatList, Button } from 'react-native';
//selectors
import { getAvailableProducts } from '../../store/selectors/productsSelectors';
//actions
import { addToCart } from '../../store/actions/cartActions';
//constants
import Colors from '../../constants/Colors';
//components
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = ({
  availableProducts,
  navigation: { navigate },
  dispatch
}) => {
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
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler({
              id: itemData.item.id,
              title: itemData.item.title
            });
          }}
        >
          <Button
            title="View Details"
            onPress={() => {
              selectItemHandler({
                id: itemData.item.id,
                title: itemData.item.title
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
      )}
    />
  );
};

const mapStateToProps = (state) => ({
  availableProducts: getAvailableProducts({ state })
});

export default connect(mapStateToProps)(ProductsOverviewScreen);
