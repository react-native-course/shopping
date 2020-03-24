import { apiService } from './HttpService';
//constants
import { getProductsUrl, getUpdateProductUrl } from '../constants/ApiUrls';

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
      url: getUpdateProductUrl(id),
      data: {
        title,
        description,
        imageUrl
      }
    });
  }
}

export default ProductsService;
