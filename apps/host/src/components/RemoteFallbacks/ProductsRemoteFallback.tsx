const ProductRemoteFallback = () => (
  <div className="bg-[#F7F3EE] min-h-screen flex flex-col">
    <div className="bg-[#0D1B2A] py-10 text-center border-b border-[#C9A96E]/15">
      <p className="text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-4">Aurex Private Banking</p>
      <div className="w-12 h-12 rounded-full border border-[#C9A96E]/30 flex items-center justify-center mx-auto mb-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5">
          <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11" />
        </svg>
      </div>
      <h1 className="font-serif text-3xl font-medium text-white mb-3">Products unavailable</h1>
      <p className="text-sm text-white/40 leading-relaxed max-w-sm mx-auto">
        We're having trouble loading our products catalogue. This is temporary — please try again in a moment.
      </p>
      <div className="w-10 h-px bg-[#C9A96E]/30 mx-auto mt-6" />
    </div>

    <div className="flex-1 flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md flex flex-col gap-3">
        <div className="bg-white border border-[#EDE5D8] rounded-2xl overflow-hidden">
          <div className="h-1 bg-[#EDE5D8]" />
          <div className="p-5 flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-[#FEF6E4] flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[#8B6914] text-sm">↻</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[#0D1B2A] mb-1">Try refreshing</p>
              <p className="text-xs text-[#5A6E82] leading-relaxed">
                A temporary network issue may have prevented the module from loading.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#EDE5D8] rounded-2xl overflow-hidden mb-2">
          <div className="h-1 bg-[#EDE5D8]" />
          <div className="p-5 flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-[#E8F4EC] flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[#1B5E35] text-sm">⌘</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[#0D1B2A] mb-1">Contact support</p>
              <p className="text-xs text-[#5A6E82] leading-relaxed">
                If the issue persists, our team is available 24/7 to assist you.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="w-full py-3.5 bg-[#0D1B2A] hover:bg-[#243B55] text-[#C9A96E] rounded-xl text-sm font-medium tracking-widest transition-colors cursor-pointer"
        >
          <p>
            Click to reload page
            <br />
            <span className="text-xs">(will logout due to auth being in memory)</span>
          </p>
        </button>
      </div>
    </div>
  </div>
);

export default ProductRemoteFallback;
