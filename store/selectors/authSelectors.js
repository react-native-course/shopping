export const getAuthErrorMessage = ({ state }) =>
  state.authReducer.errorMessage;

export const getAuthToken = ({ state }) => state.authReducer.token;
