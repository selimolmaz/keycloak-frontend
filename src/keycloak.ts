import Keycloak from 'keycloak-js';

let keycloakInstance: Keycloak | null = null;

const getKeycloak = () => {
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'selimrealm',
      clientId: 'keycloak-frontend',
    });
  }
  return keycloakInstance;
};

const keycloak = getKeycloak();

// Token yenileme mekanizması
keycloak.onTokenExpired = () => {
  keycloak.updateToken(30).catch(() => {
    console.error('Token yenilenemedi, lütfen tekrar giriş yapın');
  });
};

export default keycloak;