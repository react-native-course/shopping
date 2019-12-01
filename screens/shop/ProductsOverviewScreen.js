import React from 'react';
import {FlatList, Text} from 'react-native';
import {connect} from "react-redux";
import {getAvailableProducts} from "../../store/selectors/productsSelectors";
import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = ({availableProducts, navigation: {navigate}}) => {
    return (
        <FlatList data={availableProducts}
                  keyExtractor={(item) => item.id}
                  renderItem={itemData => <ProductItem image={itemData.item.imageUrl}
                                                       title={itemData.item.title}
                                                       price={itemData.item.price}
                                                       onAddToCart={() => {
                                                       }}
                                                       onViewDetail={() => {
                                                           navigate('ProductDetail', {
                                                               productId: itemData.item.id,
                                                               productTitle: itemData.item.title,
                                                           })
                                                       }}
                  />}/>
    );
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
};

const mapStateToProps = (state) => ({
    availableProducts: getAvailableProducts({state}),
});

export default connect(mapStateToProps)(ProductsOverviewScreen);
