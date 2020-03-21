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

const UserProductsScreen = ({
  userProducts,
  dispatch,
  navigation: { navigate }
}) => {
  const editProductHandler = (id) => {
    navigate('EditProduct', { productId: id });
  };

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
              onPress={() => dispatch(deleteProduct(id))}
              color={Colors.primary}
            />
          </ProductItem>
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  userProducts: getUserProducts({ state })
});

export default connect(mapStateToProps)(UserProductsScreen);
