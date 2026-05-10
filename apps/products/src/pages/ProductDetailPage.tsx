import { useNavigate, useParams } from 'react-router-dom';

import { useProduct } from '@hooks/queries';

const bandStyle: Record<string, string> = {
  card: 'linear-gradient(90deg, #C9A96E, #E8D5B0)',
  deposit: 'linear-gradient(90deg, #2D7A4F, #9FE1CB)',
  credit: 'linear-gradient(90deg, #185FA5, #378ADD)',
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isPending, isError } = useProduct(Number(id));

  if (isPending)
    return (
      <div className="min-h-screen bg-[#F7F3EE] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-[#EDE5D8] border-t-[#C9A96E] animate-spin" />
          <p className="text-xs">Loading product details</p>
        </div>
      </div>
    );

  if (isError || !product)
    return (
      <>
        <div className="bg-[#0D1B2A] px-6 pt-10 pb-16">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-xs text-[#C9A96E]/60 hover:text-[#C9A96E] tracking-widest uppercase transition-colors mb-10 cursor-pointer"
          >
            ← Back to products
          </button>
        </div>
        <div className="min-h-screen bg-[#F7F3EE] flex items-center justify-center text-sm text-[#5A6E82]">
          Product not found.
        </div>
      </>
    );

  return (
    <div className="min-h-screen bg-[#F7F3EE]">
      <div className="bg-[#0D1B2A] px-6 pt-10 pb-16">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-xs text-[#C9A96E]/60 hover:text-[#C9A96E] tracking-widest uppercase transition-colors mb-10 cursor-pointer"
        >
          ← Back to products
        </button>

        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-4 block">{product.categoryLabel}</span>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-white leading-tight mb-4">{product.name}</h1>
          {product.tag && (
            <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-[#8B6914] text-[#E8D5B0] tracking-wider">
              {product.tag}
            </span>
          )}
          <p className="text-sm text-white/40 mt-4 leading-relaxed max-w-md mx-auto">{product.description}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 -mt-6 pb-16">
        <div className="bg-white border border-[#EDE5D8] rounded-2xl overflow-hidden mb-5">
          <div className="h-1" style={{ background: bandStyle[product.category] }} />
          <div className="grid grid-cols-2 divide-x divide-[#EDE5D8]">
            {product.stats.map((stat) => (
              <div key={stat.label} className="p-6 text-center">
                <p className="text-xs uppercase tracking-widest text-[#8E9DAD] mb-2">{stat.label}</p>
                <p className="font-serif text-3xl font-medium text-[#0D1B2A]">
                  {stat.value}
                  {stat.unit && <span className="text-base text-[#5A6E82] ml-1">{stat.unit}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#EDE5D8] rounded-2xl p-6 mb-5">
          <p className="text-xs uppercase tracking-widest text-[#8E9DAD] mb-5">What's included</p>
          <ul className="flex flex-col divide-y divide-[#EDE5D8]">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 py-3.5 text-sm text-[#0D1B2A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <button className="w-full py-4 bg-[#0D1B2A] text-[#C9A96E] rounded-2xl text-sm font-medium tracking-widest transition-colors">
          Please contact our bank for application
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
