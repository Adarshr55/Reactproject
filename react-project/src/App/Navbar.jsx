import React, { useContext } from 'react'
import { Link,NavLink } from 'react-router-dom'
import { ShoppingCart ,LogIn,LogOut,User } from 'lucide-react'
import { AuthContest } from '../User-Auth/Authcontest'
import { useNavigate } from 'react-router-dom'
import Login from '../User-Auth/Login'
import { CartContest } from './Cartcomponent/CartContest'



function Navbar() {
    const{user,logout,isloggedin,}=useContext(AuthContest)
    const {totalItems}=useContext(CartContest)
    const navigate=useNavigate()
    const handlelogout=()=>{
        logout()
        navigate("/login")
    }
    

  return (
   <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-between px-6 md:px-12 z-50">
        <div className="flex items-center">
        <Link to="/"className="relative text-3xl font-extrabold tracking-wide text-black transition duration-300 group">
          Stride<span className="text-yellow-500">Lux</span>
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500 group-hover:w-full"></span>
        </Link>
      </div>
        <div className="hidden md:flex space-x-8 text-gray-800 font-semibold">
        {/* <NavLink to="/" className={({isActive})=>`hover:text-yellow-500 transition duration-200 ${isActive ? 'text-yellow-500' : '' }`}>Home</NavLink> */}
       <NavLink to="/products/men" className={({isActive})=>`hover:text-yellow-500 transition duration-200 ${isActive ? 'text-yellow-500' : '' }`}>Men</NavLink>
       <NavLink to="/products/Women" className={({isActive})=>`hover:text-yellow-500 transition duration-200 ${isActive ? 'text-yellow-500' : '' }`}>Women</NavLink>
       <NavLink to="/products/Kids" className={({isActive})=>`hover:text-yellow-500 transition duration-200 ${isActive ? 'text-yellow-500' : '' }`}>Kids</NavLink>
       <NavLink to="/products/sports" className={({isActive})=>`hover:text-yellow-500 transition duration-200 ${isActive ? 'text-yellow-500' : '' }`}>Sports</NavLink>
      </div>

      <div className='flex items-center space-x-6'>
        <Link to="/cart" className='relative text-gray-800 hover:text-yellow-500 transition'>
        <ShoppingCart className='w-6 h-6'/>
        {totalItems >0&&(
        <span className='absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full px-1.5'>{totalItems}</span>)}
        </Link>
        {!isloggedin ?(
            <button onClick={()=>navigate("/login")} className='flex items-center gap-1 text-gray-800 hover:text-yellow-500 transition'><LogIn className="w-5 h-5"/>
            <span className='font-semibold'>Login</span>
            </button>
        ):(
            <div className='flex items-center gap-2'>
                <User className="w-5 h-5 text-yellow-500"/>
                <span className='font-semibold text-gray-800 capitalize'>{user?.username||"User"}
                </span>
                <button onClick={handlelogout} className='flex items-center gap-1 text-gray-800 hover:text-yellow-500 transition'>
                    <LogOut className='w-5 h-5'/>
                    <span className='font-semibold'>Logout</span>
                </button>
                </div>
        )}

      </div>
        


    </nav>
  )
}

export default Navbar