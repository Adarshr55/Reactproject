import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './User-Auth/Authcontest.jsx'
import { CartProvider } from './App/Cartcomponent/CartContest.jsx'
import {  CheckoutProvider } from './App/CheckOut/CheckoutContest.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <CartProvider>
          <CheckoutProvider>
             <App/>
          </CheckoutProvider>   
        </CartProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
)
