import axios from 'axios'
import React, {  createContext, useEffect, useState } from 'react'
// import { AuthContest } from './AuthContext'


export const AuthContest = createContext()

export const AuthProvider =({children})=>{

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user")
        return storedUser ? JSON.parse(storedUser) : null
    })

//     const [user,setUser]=useState(null)


// useEffect(()=>{
//     const storedUser=localStorage.getItem("user")
//     if(storedUser){
//         setUser(JSON.parse(storedUser))
//     } 
// },[])

const login=(userData)=>{
    setUser(userData.user)
    localStorage.setItem("user",JSON.stringify(userData.user))
    // localStorage.setItem('isloggedin',true)
    localStorage.setItem('access',userData.access)
    localStorage.setItem('refresh',userData.refresh)
}

const logout=async()=>{
    try{
        const refresh =localStorage.getItem('refresh')
        const access=localStorage.getItem('access')

        await axios.post("http://localhost:8000/api/auth/logout/",{refresh},{headers:{Authorization: `Bearer ${access}`}
        })

    }catch (error){
        console.error("logout error",error)

    }finally{
        setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("cart")
    localStorage.removeItem("wishlist")
    localStorage.removeItem("count")
    localStorage.removeItem("isloggedin")
    localStorage.removeItem("access")
    localStorage.removeItem('refresh')
}
}
return(
    <AuthContest.Provider value={{user, login,logout,isloggedin:!!user,}}>
        {children}
    </AuthContest.Provider>
)
}

 