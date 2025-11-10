import React, { useContext } from 'react'
import { AuthContest } from './Authcontest'
import { Navigate } from 'react-router-dom'

function ProtectedAdminRoute({children}) {
    const {user,isloggedin}=useContext(AuthContest)

    if(!isloggedin)return <Navigate to="/login"replace/>
    if(user.role !=="admin")return <Navigate to="/"replace/>

    return children

}
  

export default ProtectedAdminRoute