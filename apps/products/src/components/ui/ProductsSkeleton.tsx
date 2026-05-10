const ProductsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-2xl border border-stone-100 overflow-hidden"
      >
        <div className="h-1.5 bg-stone-200 animate-pulse" />
        <div className="p-6 space-y-4">
          <div className="h-3 w-16 bg-stone-100 rounded-full animate-pulse" />
          <div className="h-6 w-2/3 bg-stone-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-stone-100 rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-stone-100 rounded animate-pulse" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-14 bg-stone-100 rounded-xl animate-pulse" />
            <div className="h-14 bg-stone-100 rounded-xl animate-pulse" />
          </div>
          <div className="h-10 bg-stone-200 rounded-xl animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

export default ProductsSkeleton;
