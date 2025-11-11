import React, { useContext } from 'react'
import { AuthContest } from '../../User-Auth/Authcontest'
import { LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function AdminHeader() {
  const { user, logout } = useContext(AuthContest)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">{user?.username || 'Admin'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
