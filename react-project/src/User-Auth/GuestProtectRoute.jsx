import React, { useContext } from 'react'
import { AuthContest } from './Authcontest'
import { Navigate } from 'react-router-dom'

function GuestProtectRoute({children}) {
    const {isloggedin,user}=useContext(AuthContest)
    if(isloggedin){
        if(user?.role==="admin")return <Navigate to="/admin" replace/>
        return <Navigate to="/" replace/>
    }
    return children

}

export default GuestProtectRoute