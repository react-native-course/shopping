import { apiService } from './HttpService';
//constants
import { getOrdersUrl } from '../constants/ApiUrls';

class OrdersService {
  static getOrders(userId) {
    return apiService({
      method: 'GET',
      url: getOrdersUrl(userId)
    });
  }
  static createOrder({ userId, cartItems, totalAmount, date }) {
    return apiService({
      method: 'POST',
      url: getOrdersUrl(userId),
      data: { cartItems, totalAmount, date }
    });
  }
}

export default OrdersService;
