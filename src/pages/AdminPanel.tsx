import { Link } from 'react-router-dom';
import keycloak from '../keycloak';

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-black tracking-tighter mb-4">
            ADMIN PANEL
          </h1>
          <p className="text-gray-600 font-mono">
            Hoş geldiniz, {keycloak.tokenParsed?.preferred_username}
          </p>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Link
            to="/admin/projects"
            className="border-8 border-black bg-white p-8 hover:bg-black hover:text-white transition-all group"
          >
            <div className="text-6xl font-black mb-4 text-zinc-300 group-hover:text-zinc-700">
              01
            </div>
            <h2 className="text-3xl font-black mb-4">PROJELER</h2>
            <p className="font-mono text-sm text-gray-600 group-hover:text-gray-300">
              Proje ekle, düzenle ve sil
            </p>
          </Link>

          <Link
            to="/admin/gallery"
            className="border-8 border-black bg-white p-8 hover:bg-black hover:text-white transition-all group"
          >
            <div className="text-6xl font-black mb-4 text-zinc-300 group-hover:text-zinc-700">
              02
            </div>
            <h2 className="text-3xl font-black mb-4">GALERİ</h2>
            <p className="font-mono text-sm text-gray-600 group-hover:text-gray-300">
              Galeri fotoğraflarını yönet
            </p>
          </Link>

          <Link
            to="/admin/messages"
            className="border-8 border-black bg-white p-8 hover:bg-black hover:text-white transition-all group"
          >
            <div className="text-6xl font-black mb-4 text-zinc-300 group-hover:text-zinc-700">
              03
            </div>
            <h2 className="text-3xl font-black mb-4">MESAJLAR</h2>
            <p className="font-mono text-sm text-gray-600 group-hover:text-gray-300">
              İletişim mesajlarını görüntüle
            </p>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="bg-black text-white border-8 border-black p-8">
          <h2 className="text-3xl font-black mb-8">HÜZLİ BAKIŞ</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-5xl font-black mb-2">-</div>
              <div className="text-xs font-bold tracking-widest text-gray-400">
                TOPLAM PROJE
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black mb-2">-</div>
              <div className="text-xs font-bold tracking-widest text-gray-400">
                GALERİ FOTOĞRAF
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black mb-2">-</div>
              <div className="text-xs font-bold tracking-widest text-gray-400">
                OKUNMAMIŞ MESAJ
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black mb-2">-</div>
              <div className="text-xs font-bold tracking-widest text-gray-400">
                TOPLAM MESAJ
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;