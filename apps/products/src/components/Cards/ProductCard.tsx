import { useNavigate } from 'react-router-dom';

import { type Product } from '@models/product';

const bandStyle: Record<string, string> = {
  card: 'linear-gradient(90deg, #C9A96E, #E8D5B0)',
  deposit: 'linear-gradient(90deg, #2D7A4F, #9FE1CB)',
  credit: 'linear-gradient(90deg, #185FA5, #378ADD)',
};

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="bg-white border border-[#EDE5D8] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-[#E8D5B0] transition-all duration-200 cursor-pointer"
    >
      <div className="h-1.5" style={{ background: bandStyle[product.category] }} />

      <div className="p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#FEF6E4] text-[#8B6914]">
            {product.categoryLabel}
          </span>
        </div>

        <div className="flex items-start gap-2 mb-2">
          <h2 className="font-serif text-2xl font-semibold text-[#0D1B2A] leading-tight">{product.name}</h2>
          {product.tag && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#8B6914] text-[#E8D5B0] whitespace-nowrap mt-1 tracking-wider">
              {product.tag}
            </span>
          )}
        </div>

        <p className="text-sm text-[#5A6E82] leading-relaxed mb-6 min-h-10">{product.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {product.stats.map((stat) => (
            <div key={stat.label} className="bg-[#F7F3EE] rounded-xl p-3">
              <p className="text-xs uppercase tracking-widest text-[#8E9DAD] mb-1">{stat.label}</p>
              <p className="text-lg font-medium text-[#0D1B2A] leading-none">
                {stat.value}
                {stat.unit && <span className="text-xs text-[#5A6E82] ml-0.5">{stat.unit}</span>}
              </p>
            </div>
          ))}
        </div>

        <ul className="flex flex-col gap-2 mb-6">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-[#5A6E82] leading-snug">
              <span className="w-1 h-1 rounded-full bg-[#C9A96E] shrink-0 mt-1.5" />
              {feature}
            </li>
          ))}
        </ul>

        <button className="w-full py-3 bg-[#0D1B2A] hover:bg-[#243B55] text-[#C9A96E] rounded-xl text-sm font-medium tracking-widest transition-colors cursor-pointer">
          Apply now →
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
