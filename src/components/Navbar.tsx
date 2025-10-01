import { Link } from 'react-router-dom';
import keycloak from '../keycloak';

const Navbar = () => {
  const roles = keycloak.tokenParsed?.resource_access?.['selimolmaz-rest-api']?.roles || [];
  const isAdmin = roles.includes('ADMIN');

  return (
    <nav className="bg-black text-white border-b-4 border-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex gap-1">
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
          <div>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;