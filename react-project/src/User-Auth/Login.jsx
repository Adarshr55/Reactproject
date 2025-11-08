import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContest } from './Authcontest'
import toast from 'react-hot-toast'

function Login() {
    const [userinput,setuserinput]=useState("")
    const[password,setPassword]=useState("")
    const {login}=useContext(AuthContest)
    const navigate=useNavigate()
    const handleLogin=async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.get("http://localhost:5000/users")
            const users=res.data
            const validuser=users.find((u)=>(u.username===userinput.trim()||u.email===userinput.trim()) &&u.password===password);
        
        if(validuser){
            login(validuser)
            // alert("login successsfull") 
            toast.success("Login successfull")
        if(validuser.role==="admin"){
            navigate("/admin")
        }else{
            navigate("/")
        }
        }
        else{
            // alert("invalid credentails")
            toast.error("invalid credentails")
        }
    }
    catch(error){
        console.error("error during login",error)
        // alert("Login failed")
        toast.error("Login failed")
    }
    }


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md border border-gray-100 shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">Sigh <span className="text-yellow-500">in</span> </h2>
            
            <form onSubmit={handleLogin} className='space-y-4'>
             <input 
                type='text'
                value={userinput}
                 placeholder='Email or username' 
                 onChange={(e)=>setuserinput(e.target.value)}  
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                  required/>

             <input 
                type='password'
                value={password}
                 placeholder='Enter your password' 
                 onChange={(e)=>setPassword(e.target.value)}  
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                  required/>
             <button type='submit'  
                 className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-2 rounded-full font-semibold shadow-md hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg transition-all duration-300">
                Log in
                </button>
            </form>
            <p className="text-sm text-center mt-4 text-gray-700">
                Don't have an account?{""}
                <span  
                  onClick={()=>navigate("/register")}
                 className="text-yellow-500 cursor-pointer hover:underline">
                    Register here
                 </span>
            </p>
            




        </div>
    </div>
  )
}

export default Login