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
    renderItem={(itemData) => {
      const {
        item: { totalAmount, readableDate, items }
      } = itemData;
      return (
        <OrderItem amount={totalAmount} date={readableDate} items={items} />
      );
    }}
  />
);

const mapStateToProps = (state) => ({
  orders: getOrders({ state })
});

export default connect(mapStateToProps)(OrdersScreen);
