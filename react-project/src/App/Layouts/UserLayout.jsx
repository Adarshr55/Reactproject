import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContest } from '../../User-Auth/Authcontest'

function UserLayout() {
  const {isloggedin,user}=useContext(AuthContest)
  const navigate=useNavigate()

  useEffect(()=>{
        if(isloggedin &&user?.role==="admin"){
            navigate("/admin",{replace:true})
        }
  },[isloggedin,user,navigate])

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