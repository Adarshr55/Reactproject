import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Package, ShoppingCart, LogOut } from 'lucide-react'
import { AuthContest } from '../../User-Auth/Authcontest'
import toast from 'react-hot-toast'

function AdminSideBar() {
    const{logout}=useContext(AuthContest)
    const navigate=useNavigate()
    const handleLogout=()=>{
        logout()
        toast.success("Logout Successfully")
        navigate("/login")
    }
  return (
    <div className="w-64 bg-white shadow-lg flex flex-col justify-between h-screen shrink-0">
        <div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      <nav className="mt-6">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition ${
              isActive ? 'bg-yellow-100 text-yellow-700 border-r-4 border-yellow-500' : ''
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Admin Dashboard
        </NavLink>
        <NavLink
          to="/admin/product"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition ${
              isActive ? 'bg-yellow-100 text-yellow-700 border-r-4 border-yellow-500' : ''
            }`
          }
        >
          <Package className="w-5 h-5 mr-3" />
          Products Management
        </NavLink>
        <NavLink
          to="/admin/user"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition ${
              isActive ? 'bg-yellow-100 text-yellow-700 border-r-4 border-yellow-500' : ''
            }`
          }
        >
          <Users className="w-5 h-5 mr-3" />
          Users management
        </NavLink>
        <NavLink
          to="/admin/order"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition ${
              isActive ? 'bg-yellow-100 text-yellow-700 border-r-4 border-yellow-500' : ''
            }`
          }
        >
          <ShoppingCart className="w-5 h-5 mr-3" />
          Orders management
        </NavLink>
      </nav>
    </div>
    <div className=' p-6 border-t border-gray-200'>
        <button onClick={handleLogout} className='flex items-center justify-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition'>
            <LogOut className='w-5 h-5 mr-3'/>
            <span className='font-medium'>Logout</span>
        </button>
    </div>
    </div>
  )
}

export default AdminSideBar
 