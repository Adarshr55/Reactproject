import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from './AdminSideBar'
import AdminHeader from './AdminHeader'

function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSideBar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
