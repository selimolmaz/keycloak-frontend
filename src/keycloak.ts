import Keycloak from 'keycloak-js';

let keycloakInstance: Keycloak | null = null;

const getKeycloak = () => {
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak({
      url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080',
      realm: import.meta.env.VITE_KEYCLOAK_REALM || 'selimrealm',
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'keycloak-frontend',
    });
  }
  return keycloakInstance;
};

const keycloak = getKeycloak();

keycloak.onTokenExpired = () => {
  keycloak.updateToken(30).catch(() => {
    console.error('Token yenilenemedi, lütfen tekrar giriş yapın');
  });
};

export default keycloak;