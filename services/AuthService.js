import { AuthApiServie } from './HttpService';
//constants
import { getSignUpUrl } from '../constants/ApiUrls';

class AuthService {
  static signUpUser({ email, password }) {
    return AuthApiServie({
      method: 'POST',
      url: getSignUpUrl(),
      data: { email, password, returnSecureToken: true }
    });
  }
}

export default AuthService;
