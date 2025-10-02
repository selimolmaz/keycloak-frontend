import { Link } from 'react-router-dom';
import { useState } from 'react';
import keycloak from '../keycloak';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const roles = keycloak.tokenParsed?.resource_access?.['selimolmaz-rest-api']?.roles || [];
  const isAdmin = roles.includes('ADMIN');

  return (
    <nav className="bg-black text-white border-b-4 border-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Desktop Links */}
          <div className="hidden md:flex gap-1">
            <Link
              to="/"
              className="px-6 py-3 font-black text-sm tracking-wide hover:bg-white hover:text-black transition-all"
            >
              PUBLIC
            </Link>
            {keycloak.authenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="px-6 py-3 font-black text-sm tracking-wide hover:bg-white hover:text-black transition-all"
                >
                  DASHBOARD
                </Link>
                <Link
                  to="/profile"
                  className="px-6 py-3 font-black text-sm tracking-wide hover:bg-white hover:text-black transition-all"
                >
                  PROFİL
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-6 py-3 font-black text-sm tracking-wide hover:bg-white hover:text-black transition-all"
                  >
                    ADMIN
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Logo */}
          <div className="md:hidden font-black text-lg">
            LAZER
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex">
            {keycloak.authenticated ? (
              <div className="flex gap-4 items-center">
                <span className="font-mono text-sm">{keycloak.tokenParsed?.preferred_username}</span>
                <button 
                  onClick={() => keycloak.logout()}
                  className="px-6 py-3 font-black text-sm tracking-wide bg-white text-black hover:bg-zinc-300 transition-all"
                >
                  ÇIKIŞ
                </button>
              </div>
            ) : (
              <button 
                onClick={() => keycloak.login()}
                className="px-6 py-3 font-black text-sm tracking-wide bg-white text-black hover:bg-zinc-300 transition-all"
              >
                GİRİŞ YAP
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-white hover:text-black transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-white py-4 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 font-black text-sm tracking-wide hover:bg-white hover:text-black transition-all"
            >
              PUBLIC
            </Link>
            {keycloak.authenticated && (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 font-black text-sm tracking-wide hover:bg-white hover:text-black transition-all"
                >
                  DASHBOARD
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 font-black text-sm tracking-wide hover:bg-white hover:text-black transition-all"
                >
                  PROFİL
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 font-black text-sm tracking-wide hover:bg-white hover:text-black transition-all"
                  >
                    ADMIN
                  </Link>
                )}
              </>
            )}
            
            {/* Mobile Auth */}
            <div className="pt-4 border-t-2 border-white">
              {keycloak.authenticated ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 font-mono text-xs text-gray-400">
                    {keycloak.tokenParsed?.preferred_username}
                  </div>
                  <button 
                    onClick={() => keycloak.logout()}
                    className="w-full px-4 py-3 font-black text-sm tracking-wide bg-white text-black hover:bg-zinc-300 transition-all"
                  >
                    ÇIKIŞ
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => keycloak.login()}
                  className="w-full px-4 py-3 font-black text-sm tracking-wide bg-white text-black hover:bg-zinc-300 transition-all"
                >
                  GİRİŞ YAP
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;