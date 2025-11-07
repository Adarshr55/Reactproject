import React, {  createContext, useEffect, useState } from 'react'
// import { AuthContest } from './AuthContext'


export const AuthContest = createContext()

export const AuthProvider =({children})=>{
    const [user,setUser]=useState(null)


useEffect(()=>{
    const storedUser=localStorage.getItem("user")
    if(storedUser){
        setUser(JSON.parse(storedUser))
    } 
},[])

const login=(userData)=>{
    setUser(userData)
    localStorage.setItem("user",JSON.stringify(userData))
    localStorage.setItem('isloggedin',true)
}

const logout=()=>{
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("cart")
    localStorage.removeItem("wishlist")
    localStorage.removeItem("count")
    localStorage.removeItem("isloggedin")
}
return(
    <AuthContest.Provider value={{user, login,logout,isloggedin:!!user}}>
        {children}
    </AuthContest.Provider>
)
}

 