import React ,  {useContext}from 'react'
import { AuthContest } from './Authcontest'
import { Navigate } from 'react-router-dom'


function ProtectedRoute({children}) {
    const {isloggedin}=useContext(AuthContest)
  return isloggedin ?children :<Navigate to="/login"></Navigate>
  
}

export default ProtectedRoute