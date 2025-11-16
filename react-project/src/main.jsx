import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './User-Auth/Authcontest.jsx'
import { CartProvider } from './App/Cartcomponent/CartContest.jsx'
import {  CheckoutProvider } from './App/CheckOut/CheckoutContest.jsx'
import { WishlistProvider } from './App/Wishlist/WishlistContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <CartProvider>
          <CheckoutProvider>
            <WishlistProvider>
               <App/>
            </WishlistProvider>
          </CheckoutProvider>   
        </CartProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
)
