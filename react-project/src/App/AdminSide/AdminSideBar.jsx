import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Package, ShoppingCart, LogOut, Menu } from 'lucide-react'
import { AuthContest } from '../../User-Auth/Authcontest'
import toast from 'react-hot-toast'

function AdminSideBar() {
  const { logout } = useContext(AuthContest)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success("Logout Successfully")
    navigate("/login")
  }

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        <button onClick={() => setOpen(true)}>
          <Menu className="w-7 h-7 text-gray-700" />
        </button>
      </div>

      {/* OVERLAY for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-20"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
  <aside
  className={`
     min-h-screen w-64 bg-white shadow-lg z-30 flex flex-col justify-between 
     overflow-y-auto
     transition-transform duration-300
     fixed md:static top-0 left-0
     ${open ? "translate-x-0" : "-translate-x-full"}
     md:translate-x-0
  `}
>


        <div>
          <div className="p-6 hidden md:block">
            <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          </div>

          <nav className="mt-6">
            <NavLink to="/admin" end onClick={() => setOpen(false)} className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition ${
                isActive ? 'bg-yellow-100 text-yellow-700 border-r-4 border-yellow-500' : ''
              }`
            }>
              <LayoutDashboard className="w-5 h-5 mr-3" /> Admin Dashboard
            </NavLink>

            <NavLink to="/admin/product" onClick={() => setOpen(false)} className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition ${
                isActive ? 'bg-yellow-100 text-yellow-700 border-r-4 border-yellow-500' : ''
              }`
            }>
              <Package className="w-5 h-5 mr-3" /> Products Management
            </NavLink>

            <NavLink to="/admin/user" onClick={() => setOpen(false)} className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition ${
                isActive ? 'bg-yellow-100 text-yellow-700 border-r-4 border-yellow-500' : ''
              }`
            }>
              <Users className="w-5 h-5 mr-3" /> Users management
            </NavLink>

            <NavLink to="/admin/order" onClick={() => setOpen(false)} className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition ${
                isActive ? 'bg-yellow-100 text-yellow-700 border-r-4 border-yellow-500' : ''
              }`
            }>
              <ShoppingCart className="w-5 h-5 mr-3" /> Orders management
            </NavLink>
          </nav>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default AdminSideBar
