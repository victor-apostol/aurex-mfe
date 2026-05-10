import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@services/products';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};

export const useProduct = (id: number) =>
  useQuery({
    queryKey: ['products', 'detail', id],
    queryFn: async () => {
      const products = await getProducts();
      return products.find((p) => p.id === id) ?? null;
    },
  });
