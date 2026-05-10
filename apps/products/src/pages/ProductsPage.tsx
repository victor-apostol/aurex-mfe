import HeroProducts from '@components/BankProducts/HeroProducts';
import Products from '@components/BankProducts/Products';

const ProductsPage = () => {
  return (
    <div className="bg-[#F7F3EE] min-h-screen">
      <HeroProducts />
      <Products />
    </div>
  );
};

export default ProductsPage;
