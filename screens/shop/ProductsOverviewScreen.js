import React from 'react';
import { connect } from 'react-redux';
import { FlatList, Platform } from 'react-native';
//header buttons
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//selectors
import { getAvailableProducts } from '../../store/selectors/productsSelectors';
//actions
import { addToCart } from '../../store/actions/cartActions';
//components
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

const ProductsOverviewScreen = ({
  availableProducts,
  navigation: { navigate },
  dispatch
}) => {
  return (
    <FlatList
      data={availableProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onAddToCart={() => {
            dispatch(addToCart(itemData.item));
          }}
          onViewDetail={() => {
            navigate('ProductDetail', {
              productId: itemData.item.id,
              productTitle: itemData.item.title
            });
          }}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = ({ navigation: { navigate } }) => ({
  headerTitle: 'All Products',
  headerRight: (
    <HeaderButtons
      HeaderButtonComponent={CustomHeaderButton}
      title="all products"
    >
      <Item
        title="Cart"
        label="Cart"
        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        onPress={() => navigate('Cart')}
      />
    </HeaderButtons>
  )
});

const mapStateToProps = (state) => ({
  availableProducts: getAvailableProducts({ state })
});

export default connect(mapStateToProps)(ProductsOverviewScreen);
