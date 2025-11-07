    import axios from 'axios'
    import React, { useState } from 'react'
    import { useNavigate } from 'react-router-dom'

    function Register() {
        const [username,setusername]=useState("")
        const [email,setEmail]=useState("")
        const [password,setPassword]=useState("")
        const [confirmPassword,setconfirmpassword]=useState("")
        const navigate=useNavigate()

        const handleRegister= async(e)=>{
        e.preventDefault()

        if(password !==confirmPassword){
            alert("Password do not match")
            return
        }
        try {
            const res= await axios.get(`http://localhost:5000/users`)
            const user=res.data

            const userExist=user.find((u)=>u.username===username.trim()||u.email===email.trim())
        
        if(userExist){
            alert("username or email already exists")
            return;
        }
        else{
            const newuser={
                username,
                email,
                password,
                role: "user",
                createdAt: new Date().toISOString(),
            }
            await axios.post("http://localhost:5000/users",newuser);
            alert("Registeration successfull")
            navigate("/login")
        }

        // eslint-disable-next-line no-unused-vars
        }catch(_){
            console.error("error during registration")
            alert("error")

        }

        }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 shadow-lg">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100  hover:shadow-xl transition duration-300">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">Create a <span className="text-yellow-500">Account</span> </h2>
                
            <form onSubmit={handleRegister} className='space-y-4'>
                <input 
                type='text'
                placeholder='Enter your Name'
                value={username}
                onChange={(e)=>setusername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                required />
                <br></br>

                <input 
                type='email'
                placeholder='Enter your Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                required />
                <br></br>

                <input 
                type='password'
                placeholder='Enter your Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                required />
                <br></br>

                <input 
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e)=>setconfirmpassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                required />
                <br></br>

                <button type='submit'  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-2 rounded-full font-semibold shadow-md hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg transition-all duration-300">

                    Register
                    </button>
                    <p className="text-sm text-center mt-4 text-gray-700">
                        Already have an account?{""}
                        <span
                        onClick={()=>navigate("/login")}
                        className="text-yellow-500 cursor-pointer hover:underline font-semibold">
                            login here
                        </span>
                    </p>
            </form>

        

        </div>
        </div>
    )
    }

    export default Register