import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FlatList, Alert, Text } from 'react-native';
//selectors
import {
  getOrders,
  getOrdersErrorMessage
} from '../../store/selectors/ordersSelectors';
//actions
import {
  fetchOrders,
  resetOrdersErrorMessage
} from '../../store/actions/ordersActions';
//components
import OrderItem from '../../components/shop/OrderItem';
import LoadingIcon from '../../components/UI/LoadingIcon';
import CenteredWrapper from '../../components/UI/CenteredWrapper';

const OrdersScreen = ({ orders, errorMessage, dispatch }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getOrdersList = async () => {
    setIsLoading(true);
    try {
      await dispatch(fetchOrders());
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  //fetch orders
  useEffect(() => {
    getOrdersList();
  }, [dispatch]);

  //show alert if error
  useEffect(() => {
    if (errorMessage) {
      Alert.alert('An error has occured', errorMessage, [{ text: 'Okay' }]);
    }
    return () => {
      dispatch(resetOrdersErrorMessage());
    };
  }, [errorMessage]);

  //show loading icon if loading
  if (isLoading) {
    return <LoadingIcon />;
  }

  //show a message if no orders
  if (orders.length === 0) {
    return (
      <CenteredWrapper>
        <Text>No orders found, mayby start ordering some products?</Text>
      </CenteredWrapper>
    );
  }

  return (
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
};

const mapStateToProps = (state) => ({
  orders: getOrders({ state }),
  errorMessage: getOrdersErrorMessage({ state })
});

export default connect(mapStateToProps)(OrdersScreen);
