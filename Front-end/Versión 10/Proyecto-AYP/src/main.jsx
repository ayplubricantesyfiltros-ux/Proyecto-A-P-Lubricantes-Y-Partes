import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

// En tu render principal:
<GoogleOAuthProvider clientId="TU_CLIENT_ID_DE_GOOGLE">
  <App />
</GoogleOAuthProvider>

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
