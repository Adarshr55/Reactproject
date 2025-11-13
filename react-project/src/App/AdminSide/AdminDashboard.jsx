import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from './AdminSideBar'
import AdminHeader from './AdminHeader'

function AdminDashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen overflow-hidden">
      <AdminSideBar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-5">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
