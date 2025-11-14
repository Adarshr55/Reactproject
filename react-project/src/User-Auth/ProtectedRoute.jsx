import React ,  {useContext}from 'react'
import { AuthContest } from './Authcontest'
import { Navigate } from 'react-router-dom'


function ProtectedRoute({children}) {
    const {isloggedin,user}=useContext(AuthContest)
     if(!isloggedin)return <Navigate to="/login" replace />
     if(user?.role==="admin")return <Navigate to="/admin" replace/>
     return children
  
}

export default ProtectedRoute