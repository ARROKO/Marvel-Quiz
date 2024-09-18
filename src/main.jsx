import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App/index.jsx'
import './index.css'
import AuthProvider from './components/Firebase/context.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AuthProvider>
)
