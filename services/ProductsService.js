import { apiService } from './HttpService';
//constants
import { getProductsUrl, getProductUrl } from '../constants/ApiUrls';

class ProductsService {
  static getProducts() {
    return apiService({
      method: 'GET',
      url: getProductsUrl()
    });
  }
  static createProduct({ title, description, imageUrl, price, token, userId }) {
    return apiService({
      method: 'POST',
      url: getProductsUrl(),
      data: {
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      },
      params: { auth: token }
    });
  }
  static updateProduct({ id, title, description, imageUrl, token }) {
    return apiService({
      method: 'PATCH',
      url: getProductUrl(id),
      data: {
        title,
        description,
        imageUrl
      },
      params: { auth: token }
    });
  }
  static deleteProduct({ id, token }) {
    return apiService({
      method: 'DELETE',
      url: getProductUrl(id),
      params: { auth: token }
    });
  }
}

export default ProductsService;
