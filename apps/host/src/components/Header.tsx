import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@aurex/auth';

const Header = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  return (
    <header className="bg-[#0D1B2A] border-b border-[#C9A96E]/20">
      <div className="px-6 h-16 flex items-center justify-between">
        <div onClick={() => navigate('/products')} className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full border border-[#C9A96E] flex items-center justify-center text-[#C9A96E] text-sm shrink-0">
            A
          </div>
          <span className="font-serif text-[#C9A96E] text-xl tracking-widest">AUREX BANK</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {user?.name && <span className="text-white/50 text-sm">Hello, {user.name}</span>}
          <div className="w-px h-4 bg-[#C9A96E]/20" />
          <button
            onClick={handleLogout}
            className="text-sm text-[#C9A96E] border border-[#C9A96E]/40 hover:border-[#C9A96E] px-4 py-1.5 rounded-lg transition-colors tracking-wide cursor-pointer"
          >
            Logout
          </button>
        </nav>

        <button
          className="md:hidden text-[#C9A96E] p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#C9A96E]/10 px-6 py-4 flex flex-col gap-4">
          {user?.name && <span className="text-white/40 text-sm">Hello, {user.name}</span>}
          <button onClick={handleLogout} className="text-left text-sm text-[#C9A96E] tracking-wide">
            Logout
          </button>
        </div>
      )}

      <div className="g-gradient-to-b from-[#0D1B2A] to-[#C9A96E]/10" />
    </header>
  );
};

export default Header;
