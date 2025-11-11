import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <>
    <Navbar/>
    <main className='pt-6'>
        <Outlet/>
    </main>
    </>
  )
}

export default UserLayout