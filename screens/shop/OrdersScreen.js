import React from 'react';
import { connect } from 'react-redux';
import { FlatList, Text, Platform } from 'react-native';
//header buttons
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//selectors
import { getOrders } from '../../store/selectors/ordersSelectors';
//components
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = ({ orders }) => (
  <FlatList
    data={orders}
    keyExtractor={(item) => item.id}
    renderItem={(itemData) => (
      <OrderItem
        amount={itemData.item.totalAmount}
        date={itemData.item.readableDate}
      />
    )}
  />
);

OrdersScreen.navigationOptions = ({ navigation: { toggleDrawer } }) => ({
  headerLeft: (
    <HeaderButtons
      HeaderButtonComponent={CustomHeaderButton}
      title="menu content"
    >
      <Item
        title="Menu"
        label="Menu"
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => toggleDrawer()}
      />
    </HeaderButtons>
  )
});

const mapStateToProps = (state) => ({
  orders: getOrders({ state })
});

export default connect(mapStateToProps)(OrdersScreen);
