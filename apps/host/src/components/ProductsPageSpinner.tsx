const ProductPageSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-9 h-9 rounded-full border-2 border-stone-200 border-t-yellow-600 animate-spin" />
      <p className="text-sm text-stone-400">Loading products…</p>
    </div>
  );
};

export default ProductPageSpinner;
