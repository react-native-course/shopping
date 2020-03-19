export const getCartItems = ({ state }) => state.cartReducer.items;

export const getCartTotalAmount = ({ state }) => state.cartReducer.totalAmount;
