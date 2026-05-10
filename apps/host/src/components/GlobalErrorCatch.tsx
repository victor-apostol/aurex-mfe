type ErrorPageProps = {
  error?: Error | null;
  onReset?: () => void;
};

const GlobalErrorCatchPage = ({ error, onReset }: ErrorPageProps) => {
  const handleReset = () => {
    onReset?.();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#F7F3EE] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 rounded-full border border-[#C9A96E]/40 flex items-center justify-center mx-auto mb-8">
          <span className="font-serif text-2xl text-[#C9A96E]">!</span>
        </div>

        <p className="text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-4">
          Something went wrong
        </p>

        <h1 className="font-serif text-4xl font-medium text-[#0D1B2A] mb-4">
          Unexpected error
        </h1>

        <p className="text-sm text-[#5A6E82] leading-relaxed mb-8">
          An unexpected error occurred. Please try again or return to the
          homepage.
        </p>

        {error?.message && (
          <p className="text-xs text-[#8E9DAD] bg-white border border-[#EDE5D8] rounded-xl px-4 py-3 mb-8 font-mono text-left break-all">
            {error.message}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onReset}
            className="px-6 py-2.5 bg-[#0D1B2A] hover:bg-[#243B55] text-[#C9A96E] rounded-xl text-sm font-medium tracking-widest transition-colors cursor-pointer"
          >
            Try again →
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 border border-[#EDE5D8] hover:border-[#C9A96E]/40 text-[#5A6E82] rounded-xl text-sm transition-colors cursor-pointer"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalErrorCatchPage;
