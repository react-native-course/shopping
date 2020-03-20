import React from 'react';
import { connect } from 'react-redux';
import { FlatList, Platform } from 'react-native';
//selectors
import { getUserProducts } from '../../store/selectors/productsSelectors';
//components
import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen = ({ userProducts }) => (
  <FlatList
    data={userProducts}
    keyExtractor={(item) => item.id}
    renderItem={(itemData) => (
      <ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetail={() => {}}
        onAddToCart={() => {}}
      />
    )}
  />
);

const mapStateToProps = (state) => ({
  userProducts: getUserProducts({ state })
});

export default connect(mapStateToProps)(UserProductsScreen);
