import ProductCard from '@components/Cards/ProductCard';
import ProductsSkeleton from '@components/ui/ProductsSkeleton';

import { useProducts } from '@hooks/queries';

import { type Product } from '@models/product';

const CATEGORY_ORDER = ['card', 'deposit', 'credit'] as const;

const groupByCategory = (products: Array<Product>) => {
  return CATEGORY_ORDER.reduce(
    (acc, cat) => {
      const items = products.filter((p) => p.category === cat);

      if (items.length) {
        acc[cat] = items;
      }

      return acc;
    },
    {} as Record<string, Array<Product>>,
  );
};

const Products = () => {
  const { data: products, isPending, isError } = useProducts();

  if (isPending) return <ProductsSkeleton />;
  if (isError) return <div className="error">An error has occurred</div>;

  const grouped = groupByCategory(products ?? []);

  return (
    <div className="max-w-6xl mx-auto px-8 py-12 flex flex-col gap-12">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <div className="flex items-center gap-4 mb-6">
            <p className="text-xs tracking-[0.18em] uppercase text-[#8B6914] whitespace-nowrap">
              {items[0].categoryLabel}
            </p>
            <div className="h-px flex-1 bg-[#C9A96E]/25" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
