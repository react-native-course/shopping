export const getAuthErrorMessage = ({ state }) =>
  state.authReducer.errorMessage;

export const getAuthToken = ({ state }) => state.authReducer.token;

export const getAuthUserId = ({ state }) => state.authReducer.userId;

export const getDidTryAutoLogin = ({ state }) =>
  state.authReducer.didTryAutoLogin;
