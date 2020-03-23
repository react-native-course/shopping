export const getAvailableProducts = ({ state }) =>
  state.productsReducer.availableProducts;

export const getUserProducts = ({ state }) =>
  state.productsReducer.userProducts;

export const getProductsErrorMessage = ({ state }) =>
  state.productsReducer.errorMessage;
