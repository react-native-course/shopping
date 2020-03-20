import React from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
//selectors
import { getOrders } from '../../store/selectors/ordersSelectors';
//components
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = ({ orders }) => (
  <FlatList
    data={orders}
    keyExtractor={(item) => item.id}
    renderItem={(itemData) => (
      <OrderItem
        amount={itemData.item.totalAmount}
        date={itemData.item.readableDate}
        items={itemData.item.items}
      />
    )}
  />
);

const mapStateToProps = (state) => ({
  orders: getOrders({ state })
});

export default connect(mapStateToProps)(OrdersScreen);
