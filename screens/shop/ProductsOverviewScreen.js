import React from 'react';
import {FlatList, Text} from 'react-native';
import {connect} from "react-redux";
import {getAvailableProducts} from "../../store/selectors/productsSelectors";

const ProductsOverviewScreen = ({availableProducts}) => {
    return (
        <FlatList data={availableProducts}
                  keyExtractor={(item) => item.id}
                  renderItem={itemData => <Text>{itemData.item.title}</Text>}/>
    );
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
};

const mapStateToProps = (state) => ({
    availableProducts: getAvailableProducts({state}),
});

export default connect(mapStateToProps)(ProductsOverviewScreen);
