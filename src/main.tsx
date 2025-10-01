import { createRoot } from 'react-dom/client'
import keycloak from './keycloak'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary' // Ekleyin
import './index.css'

keycloak.init({ onLoad: 'check-sso', checkLoginIframe: false }).then(() => {
  createRoot(document.getElementById('root')!).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  )
})