import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@aurex/auth';

const LoginPage = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: (userName: string) => loginUser(userName),
    onSuccess: () => navigate('/products', { replace: true }),
  });

  const trimmedName = name.trim();
  const isSignInButtonDisabled = !trimmedName || isPending;

  const handleLogin = () => {
    if (isSignInButtonDisabled) {
      return;
    }

    mutate(trimmedName);
  };

  return (
    <div className="min-h-screen bg-[#F7F3EE] flex items-center justify-center px-4">
      <div className="bg-white border border-[#EDE5D8] rounded-2xl p-10 w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 rounded-full border border-[#C9A96E] flex items-center justify-center text-[#C9A96E] text-base mb-4">
            A
          </div>
          <h1 className="font-serif text-2xl text-[#0D1B2A]">Welcome back</h1>
          <p className="text-sm text-[#5A6E82] mt-1">Sign in to your account</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-widest text-[#8E9DAD]">Your name</label>
            <input
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="e.g John"
              className="w-full px-4 py-2.5 rounded-xl border border-[#EDE5D8] bg-[#F7F3EE] text-sm text-[#0D1B2A] placeholder:text-[#8E9DAD] focus:outline-none focus:border-[#C9A96E] transition-colors caret-[#0D1B2A]"
            />
          </div>

          <button
            onClick={() => handleLogin()}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            disabled={isSignInButtonDisabled}
            className="w-full py-3 bg-[#0D1B2A] hover:bg-[#243B55] disabled:opacity-40 disabled:cursor-not-allowed text-[#C9A96E] rounded-xl text-sm font-medium tracking-widest transition-colors cursor-pointer"
          >
            Sign in →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
