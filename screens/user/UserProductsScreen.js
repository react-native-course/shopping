import React from 'react';
import { connect } from 'react-redux';
import { FlatList, Button } from 'react-native';
//selectors
import { getUserProducts } from '../../store/selectors/productsSelectors';
//actions
import { deleteProduct } from '../../store/actions/productsActions';
//constants
import Colors from '../../constants/Colors';
//components
import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen = ({ userProducts, dispatch }) => (
  <FlatList
    data={userProducts}
    keyExtractor={(item) => item.id}
    renderItem={(itemData) => (
      <ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={() => {}}
      >
        <Button title="Edit" onPress={() => {}} color={Colors.primary} />
        <Button
          title="Delete"
          onPress={() => dispatch(deleteProduct(itemData.item.id))}
          color={Colors.primary}
        />
      </ProductItem>
    )}
  />
);

const mapStateToProps = (state) => ({
  userProducts: getUserProducts({ state })
});

export default connect(mapStateToProps)(UserProductsScreen);
