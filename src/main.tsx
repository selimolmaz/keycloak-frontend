import { createRoot } from 'react-dom/client'
import keycloak from './keycloak'
import App from './App.tsx'
import './index.css'

keycloak.init({ onLoad: 'check-sso' }).then(() => {
  createRoot(document.getElementById('root')!).render(<App />)
})