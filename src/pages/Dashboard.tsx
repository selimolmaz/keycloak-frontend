import { useState } from 'react';
import { Link } from 'react-router-dom';
import keycloak from '../keycloak';
import axios from 'axios';

const Dashboard = () => {
  const [adminResponse, setAdminResponse] = useState<string>('');
  const [userResponse, setUserResponse] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  const roles = keycloak.tokenParsed?.resource_access?.['selimolmaz-rest-api']?.roles || [];

  const testAdminEndpoint = async () => {
    try {
      setError('');
      setAdminResponse('');
      const response = await axios.get('http://localhost:8081/api/admin', {
        headers: { Authorization: `Bearer ${keycloak.token}` },
      });
      setAdminResponse(response.data);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError('Bu endpoint için yetkiniz yok. ADMIN rolü gerekli.');
      } else {
        setError('Bir hata oluştu');
      }
    }
  };

  const testUserEndpoint = async () => {
    try {
      setError('');
      setUserResponse('');
      const response = await axios.get('http://localhost:8081/api/user', {
        headers: { Authorization: `Bearer ${keycloak.token}` },
      });
      setUserResponse(response.data);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError('Bu endpoint için yetkiniz yok. USER rolü gerekli.');
      } else {
        setError('Bir hata oluştu');
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="text-sm font-bold text-gray-600 hover:text-black mb-2 block">
            ← ANA SAYFA
          </Link>
          <h1 className="text-6xl font-black tracking-tighter mb-4">
            DASHBOARD
          </h1>
          <p className="text-gray-600 font-mono">
            Hoş geldiniz, {keycloak.tokenParsed?.preferred_username}
          </p>
        </div>

        {/* Roles */}
        <div className="mb-12 border-8 border-black bg-white p-8">
          <h2 className="text-3xl font-black mb-6 tracking-tight">ROLLERİNİZ</h2>
          <div className="flex gap-4 flex-wrap">
            {roles.map(role => (
              <span 
                key={role}
                className="px-8 py-4 bg-black text-white font-black text-lg border-4 border-black"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* API Tests */}
        <div className="border-8 border-black bg-white p-8">
          <h2 className="text-3xl font-black mb-6 tracking-tight">BACKEND API TEST</h2>
          
          <div className="flex gap-4 mb-8">
            <button 
              onClick={testUserEndpoint}
              className="px-8 py-4 bg-black text-white font-black tracking-wide hover:bg-zinc-800 transition-all"
            >
              USER ENDPOINT
            </button>
            <button 
              onClick={testAdminEndpoint}
              className="px-8 py-4 bg-black text-white font-black tracking-wide hover:bg-zinc-800 transition-all"
            >
              ADMIN ENDPOINT
            </button>
          </div>

          {userResponse && (
            <div className="mb-4 p-6 bg-green-500 text-white border-4 border-black">
              <div className="font-black mb-2">USER RESPONSE:</div>
              <div className="font-mono text-sm">{userResponse}</div>
            </div>
          )}

          {adminResponse && (
            <div className="mb-4 p-6 bg-green-500 text-white border-4 border-black">
              <div className="font-black mb-2">ADMIN RESPONSE:</div>
              <div className="font-mono text-sm">{adminResponse}</div>
            </div>
          )}

          {error && (
            <div className="p-6 bg-red-500 text-white border-4 border-black">
              <div className="font-black mb-2">HATA:</div>
              <div className="font-mono text-sm">{error}</div>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            to="/profile"
            className="border-8 border-black bg-white p-8 hover:bg-black hover:text-white transition-all group"
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
            className="border-8 border-black bg-white p-8 hover:bg-black hover:text-white transition-all group"
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
            className="border-8 border-black bg-white p-8 hover:bg-black hover:text-white transition-all group"
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
    </div>
  );
};

export default Dashboard;