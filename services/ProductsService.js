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
  static createProduct({ title, description, imageUrl, price }) {
    return apiService({
      method: 'POST',
      url: getProductsUrl(),
      data: {
        title,
        description,
        imageUrl,
        price
      }
    });
  }
  static updateProduct({ id, title, description, imageUrl }) {
    return apiService({
      method: 'PATCH',
      url: getProductUrl(id),
      data: {
        title,
        description,
        imageUrl
      }
    });
  }
  static deleteProduct(id) {
    return apiService({
      method: 'DELETE',
      url: getProductUrl(id)
    });
  }
}

export default ProductsService;
