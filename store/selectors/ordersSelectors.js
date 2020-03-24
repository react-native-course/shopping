export const getOrders = ({ state }) => state.ordersReducer.orders;

export const getOrdersErrorMessage = ({ state }) =>
  state.ordersReducer.errorMessage;
