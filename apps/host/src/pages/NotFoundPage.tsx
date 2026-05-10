const NotFoundPage = () => (
  <div className="min-h-screen bg-[#F7F3EE] flex items-center justify-center px-4">
    <div className="text-center max-w-md">
      <p className="font-serif text-[120px] font-medium text-[#0D1B2A]/5 leading-none mb-0 select-none">
        404
      </p>

      <div className="w-14 h-14 rounded-full border border-[#C9A96E]/40 flex items-center justify-center mx-auto -mt-8 mb-8">
        <span className="font-serif text-2xl text-[#C9A96E]">?</span>
      </div>

      <p className="text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-4">
        Page not found
      </p>

      <h1 className="font-serif text-4xl font-medium text-[#0D1B2A] mb-4">
        Nothing here
      </h1>

      <p className="text-sm text-[#5A6E82] leading-relaxed mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => (window.location.href = '/')}
        className="px-6 py-2.5 bg-[#0D1B2A] hover:bg-[#243B55] text-[#C9A96E] rounded-xl text-sm font-medium tracking-widest transition-colors cursor-pointer"
      >
        Back to home →
      </button>
    </div>
  </div>
);

export default NotFoundPage;
