  import './App.css'
  import { Route, Routes, useLocation } from 'react-router-dom'
  import Register from './User-Auth/Register'
  import Login from './User-Auth/Login'
  import Home from './App/Home'
  import ProtectedRoute from './User-Auth/ProtectedRoute'
  import Cart from './App/Cartcomponent/Cart'
  import ProductList from './App/ProductList'
  import Navbar from './App/Navbar'
  import ProductDetails from './App/ProductDetails'
import Checkout from './App/CheckOut/CheckOut'
import OrderSuccess from './App/CheckOut/OrderSuccess'
import MyOrder from './App/CheckOut/MyOrder'
import { Toaster } from 'react-hot-toast'
import AdminDashboard from './App/AdminSide/AdminDashboard'
import ProtectedAdminRoute from './User-Auth/ProtectedAdminRoute'
import GuestProtectRoute from './User-Auth/GuestProtectRoute'
import AdminOrder from './App/AdminSide/Pages/AdminOrder'
import AdminUser from './App/AdminSide/Pages/AdminUser'
import AdminProduct from './App/AdminSide/Pages/AdminProduct'

  function App() {
      const location =useLocation()
      const isAdminRoute=location.pathname.startsWith("/admin")
    return (

      <>
      <Toaster position='top-center'toastOptions={{duration:400,
        style:{background:"#fff",color: "#333",borderRadius:"10px", boxShadow:"0 4px 10px rgba(0,0,0,0.1)"}}}/>
         { !isAdminRoute && <Navbar/>}
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/register'element={<GuestProtectRoute><Register/></GuestProtectRoute>}/>
        <Route path='/login'element={<GuestProtectRoute><Login/></GuestProtectRoute>}/>
        <Route path='/products'element={<ProductList/>}/>
        <Route path='/products/:category'element={<ProductList/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/cart"element={<ProtectedRoute> <Cart/> </ProtectedRoute>}/>
        <Route path='/checkout'element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
        <Route path='/order-success'element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
        <Route path='/myorder'element={<ProtectedRoute><MyOrder/></ProtectedRoute>}/>
        <Route path="/admin"element={<ProtectedAdminRoute><AdminDashboard/></ProtectedAdminRoute>}/>
        <Route path="/admin/admin-order"element={<ProtectedAdminRoute><AdminOrder/></ProtectedAdminRoute>}/>
        <Route path="/admin/admin-user"element={<ProtectedAdminRoute><AdminUser/></ProtectedAdminRoute>}/>
        <Route path="/admin-product"element={<ProtectedAdminRoute><AdminProduct/></ProtectedAdminRoute>}/>
      </Routes>
      
      </>
    )
  }
  export default App
