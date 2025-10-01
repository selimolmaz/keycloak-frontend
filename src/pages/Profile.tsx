import { Link } from 'react-router-dom';
import keycloak from '../keycloak';

const Profile = () => {
  const tokenParsed = keycloak.tokenParsed;
  const roles = tokenParsed?.resource_access?.['selimolmaz-rest-api']?.roles || [];

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link to="/dashboard" className="text-sm font-bold text-gray-600 hover:text-black mb-2 block">
            ← DASHBOARD
          </Link>
          <h1 className="text-6xl font-black tracking-tighter mb-4">
            PROFİL
          </h1>
          <p className="text-gray-600 font-mono">
            Kullanıcı bilgileriniz ve roller
          </p>
        </div>

        {/* Profile Info */}
        <div className="space-y-6 mb-12">
          {/* Username */}
          <div className="border-8 border-black bg-white p-8">
            <div className="text-xs font-black text-gray-500 mb-4 tracking-widest">
              KULLANICI ADI
            </div>
            <div className="text-3xl font-black">
              {tokenParsed?.preferred_username || 'Bulunamadı'}
            </div>
          </div>

          {/* Name */}
          <div className="border-8 border-black bg-white p-8">
            <div className="text-xs font-black text-gray-500 mb-4 tracking-widest">
              AD SOYAD
            </div>
            <div className="text-3xl font-black">
              {tokenParsed?.name || 'Bulunamadı'}
            </div>
          </div>

          {/* Email */}
          <div className="border-8 border-black bg-white p-8">
            <div className="text-xs font-black text-gray-500 mb-4 tracking-widest">
              E-POSTA
            </div>
            <div className="text-2xl font-black break-all">
              {tokenParsed?.email || 'Bulunamadı'}
            </div>
            <div className="mt-4 pt-4 border-t-2 border-zinc-300">
              <span className={`px-4 py-2 font-bold text-sm ${
                tokenParsed?.email_verified 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}>
                {tokenParsed?.email_verified ? '✓ DOĞRULANMIŞ' : '✗ DOĞRULANMAMIŞ'}
              </span>
            </div>
          </div>

          {/* Roles */}
          <div className="border-8 border-black bg-black text-white p-8">
            <div className="text-xs font-black text-gray-400 mb-6 tracking-widest">
              ROLLER
            </div>
            <div className="flex gap-4 flex-wrap">
              {roles.length > 0 ? (
                roles.map((role: string) => (
                  <span 
                    key={role}
                    className="px-8 py-4 bg-white text-black font-black text-lg border-4 border-white"
                  >
                    {role}
                  </span>
                ))
              ) : (
                <div className="text-gray-400 font-mono">Rol bulunamadı</div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button 
            onClick={() => keycloak.accountManagement()}
            className="w-full px-12 py-8 bg-black text-white font-black text-xl tracking-wide hover:bg-zinc-800 transition-all border-4 border-black"
          >
            PROFİLİ DÜZENLE →
          </button>

          <Link
            to="/dashboard"
            className="w-full px-12 py-8 bg-white text-black font-black text-xl tracking-wide hover:bg-zinc-100 transition-all border-4 border-black text-center"
          >
            ← DASHBOARD'A DÖN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;