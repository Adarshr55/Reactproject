  import './App.css'
  import { Route, Routes } from 'react-router-dom'
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

  function App() {
    return (

      <>
      <Navbar/>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/register'element={<Register/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/products'element={<ProductList/>}/>
        <Route path='/products/:category'element={<ProductList/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/cart"element={<ProtectedRoute> <Cart/> </ProtectedRoute>}/>
        <Route path='/checkout'element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
        <Route path='/order-success'element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
        <Route path='/myorder'element={<ProtectedRoute><MyOrder/></ProtectedRoute>}/>
      </Routes>
      
      </>
    )
  }
  export default App
