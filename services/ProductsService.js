import { apiService } from './HttpService';
//constants
import { getProductsUrl } from '../constants/ApiUrls';

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
}

export default ProductsService;
