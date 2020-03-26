import { AuthApiServie } from './HttpService';
//constants
import { getSignUpUrl, getSignInUrl } from '../constants/ApiUrls';

class AuthService {
  static signUpUser({ email, password }) {
    return AuthApiServie({
      method: 'POST',
      url: getSignUpUrl(),
      data: { email, password, returnSecureToken: true }
    });
  }
  static signInUser({ email, password }) {
    return AuthApiServie({
      method: 'POST',
      url: getSignInUrl(),
      data: { email, password, returnSecureToken: true }
    });
  }
}

export default AuthService;
