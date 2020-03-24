import { apiService } from './HttpService';
//constants
import { getCreateOrderUrl } from '../constants/ApiUrls';

class OrdersService {
  static createOrder({ userId, cartItems, totalAmount, date }) {
    return apiService({
      method: 'POST',
      url: getCreateOrderUrl(userId),
      data: { cartItems, totalAmount, date }
    });
  }
}

export default OrdersService;
