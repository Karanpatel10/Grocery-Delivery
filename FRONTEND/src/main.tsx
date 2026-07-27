import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import {CartProvider} from './Context/CartContext'
import { AuthProvider } from './Context/AuthContext.tsx'
import {LoadingProvider} from './Context/LoadingContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
   <LoadingProvider>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
    </LoadingProvider>
  </BrowserRouter>,
)
