import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

const PublicLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/public', label: 'ANA SAYFA' },
    { path: '/public/about', label: 'HAKKIMIZDA' },
    { path: '/public/services', label: 'HİZMETLER' },
    { path: '/public/projects', label: 'PROJELER' },
    { path: '/public/gallery', label: 'GALERİ' },
    { path: '/public/contact', label: 'İLETİŞİM' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-black text-white z-50 border-b-4 border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/public" className="text-3xl font-black tracking-tighter hover:bg-white hover:text-black px-4 py-2 transition-all">
              LAZER
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 font-bold text-sm tracking-wide transition-all ${
                    isActive(link.path)
                      ? 'bg-white text-black'
                      : 'hover:bg-white hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white hover:text-black transition-all"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className="w-full h-1 bg-current"></span>
                <span className="w-full h-1 bg-current"></span>
                <span className="w-full h-1 bg-current"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-white">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 font-bold text-sm tracking-wide transition-all ${
                    isActive(link.path)
                      ? 'bg-white text-black'
                      : 'hover:bg-white hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black text-white border-t-4 border-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Company Info */}
            <div>
              <h3 className="text-4xl font-black mb-6 tracking-tighter">LAZER</h3>
              <p className="text-gray-400 font-mono text-sm leading-relaxed">
                Endüstriyel lazer kesim ve metal işleme hizmetleri. Hassasiyet ve kalite odaklı çözümler.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-black mb-6 tracking-tight">HIZLI ERİŞİM</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white font-mono text-sm transition-colors"
                    >
                      → {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-black mb-6 tracking-tight">İLETİŞİM</h4>
              <div className="space-y-3 text-gray-400 font-mono text-sm">
                <p>Tel: +90 XXX XXX XX XX</p>
                <p>Email: info@lazer.com</p>
                <p>Adres: Sanayi Bölgesi, Türkiye</p>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-zinc-800 mt-12 pt-8 text-center">
            <p className="text-gray-500 font-mono text-xs">
              © 2025 LAZER. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;