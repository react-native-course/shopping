import React from 'react';
import {connect} from "react-redux";
import {
    ScrollView,
    View,
    Text,
    Image,
    Button,
    StyleSheet
} from 'react-native';
import {getAvailableProducts} from "../../store/selectors/productsSelectors";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center',
    },
});

const ProductDetailScreen = ({navigation: {getParam}, availableProducts}) => {
    const productId = getParam('productId'),
        selectedProduct = availableProducts.find(prod => prod.id === productId);

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
            <View style={styles.actions}>
                <Button
                    color={Colors.primary}
                    title="Add to Cart"
                    onPress={() => {
                    }}
                />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = ({navigation: {getParam}}) => ({
    headerTitle: getParam('productTitle'),
});

const mapStateToProps = (state) => ({
    availableProducts: getAvailableProducts({state}),
});

export default connect(mapStateToProps)(ProductDetailScreen);
