import { Navigate } from 'react-router-dom';
import keycloak from '../keycloak';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  if (!keycloak.authenticated) {
    keycloak.login();
    return null;
  }

  if (requiredRole) {
    const roles = keycloak.tokenParsed?.resource_access?.['selimolmaz-rest-api']?.roles || [];
    if (!roles.includes(requiredRole)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;