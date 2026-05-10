import { mockProducts } from '../data/products';
import { type Product } from '@models/product';

export const getProducts = async (): Promise<Array<Product>> => {
  // const response = (await api.get<Array<Product>>('/products')).data;
  // return response;

  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProducts;
};
