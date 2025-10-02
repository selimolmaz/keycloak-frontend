
import { Link } from 'react-router-dom';
import keycloak from '../keycloak';
 
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="text-sm font-bold text-gray-600 hover:text-black mb-2 block">
            ← ANA SAYFA
          </Link>
          <h1 className="text-3xl font-black tracking-tighter mb-4">
            DASHBOARD
          </h1>
          <p className="text-gray-600 font-mono">
            Hoş geldiniz, {keycloak.tokenParsed?.preferred_username}
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link
          to="/profile"
          className="border-8 border-black bg-white p-4 md:p-8 hover:bg-black hover:text-white transition-all group"
        >
          <div className="text-6xl font-black mb-4 text-zinc-300 group-hover:text-zinc-700">
            01
          </div>
          <h3 className="text-2xl font-black">PROFİL</h3>
          <p className="font-mono text-sm text-gray-600 group-hover:text-gray-300 mt-2">
            Profil bilgilerinizi görüntüleyin
          </p>
        </Link>

        <Link
          to="/admin"
          className="border-8 border-black bg-white p-4 md:p-8 hover:bg-black hover:text-white transition-all group"
        >
          <div className="text-6xl font-black mb-4 text-zinc-300 group-hover:text-zinc-700">
            02
          </div>
          <h3 className="text-2xl font-black">ADMIN PANEL</h3>
          <p className="font-mono text-sm text-gray-600 group-hover:text-gray-300 mt-2">
            Yönetim paneline gidin
          </p>
        </Link>

        <Link
          to="/public"
          className="border-8 border-black bg-white p-4 md:p-8 hover:bg-black hover:text-white transition-all group"
        >
          <div className="text-6xl font-black mb-4 text-zinc-300 group-hover:text-zinc-700">
            03
          </div>
          <h3 className="text-2xl font-black">PUBLIC SİTE</h3>
          <p className="font-mono text-sm text-gray-600 group-hover:text-gray-300 mt-2">
            Ana siteye dönün
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;