import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContest } from './Authcontest'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Eye, EyeOff } from 'lucide-react'

   const validationSchema =Yup.object({
    userinput:Yup.string()
    .required("username or  email required")
    .test('is-email-or-username','enter a valid email or username',(value)=>{
        if(!value)return false
        if(value.includes('@')){
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        }
        return /^[a-zA-Z0-9_]{3,}$/.test(value);
    }),
    password:Yup.string()
    .required("password is required")
    .min(6,"password must be at least 6 characters")

   })

function Login() {
    // const [userinput,setuserinput]=useState("")
    // const[password,setPassword]=useState("")
    const {login,isloggedin}=useContext(AuthContest)   
    const navigate=useNavigate()
    const[showPassword,setShowPassword]=useState(false)

    // useEffect(()=>{
    //     if(isloggedin){
    //         const storedUser=JSON.parse(localStorage.getItem("user"))
    //         if(storedUser ?.role==="admin")
    //         navigate("/admin")
    //     }else{
    //         navigate("/")
    //     }
    // },[isloggedin,navigate])


    // const handleLogin=async(e)=>{
    //     e.preventDefault()
    const formik=useFormik({
        initialValues:{userinput:"",password:""},
        validationSchema,
        onSubmit:async (values,{setSubmitting})=>{
            // try{
            //     const res=await axios.get("http://localhost:5000/users")
            //     const users=res.data
            //     const validuser=users.find(
            //         (u)=>(u.username=== values.userinput.trim()||
            //         u.email=== values.userinput.trim()) &&
            //         u.password=== values.password);

             try {
        const userInput = values.userinput.trim();
        const password = values.password;

        // 1️⃣ Fetch admins
        const adminRes = await axios.get("http://localhost:5000/admins");
        const admins = adminRes.data;

        // Check admin login
        const admin = admins.find(
            (a) =>
                (a.username === userInput || a.email === userInput) &&
                a.password === password
        );
            if (admin) {
            login(admin);
            toast.success("Admin login successful!");
            navigate("/admin");
            return;
        }

        // 2️⃣ Fetch regular users if not admin
        const userRes = await axios.get("http://localhost:5000/users");
        const users = userRes.data;

        const validuser = users.find(
            (u) =>
                (u.username === userInput || u.email === userInput) &&
                u.password === password
        );
                
            
        if(validuser){
            login(validuser)
            // alert("login successsfull") 
            toast.success("Login successfull")
        navigate(validuser.role==="admin"?"/admin":"/")
        console.log("logged IN USER",validuser)
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
    }finally{
        setSubmitting(false)
    }
    }

})


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md border border-gray-100 shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">Sign <span className="text-yellow-500">in</span> </h2>
            
            <form onSubmit={formik.handleSubmit} className='space-y-4'>
                <div>
             <input 
                type='text'
                name='userinput'
                value={formik.values.userinput}
                 placeholder='Email or username' 
                 onChange={formik.handleChange}  
                 onBlur={formik.handleBlur}
                   className={`w-full px-4 py-2 border rounded-lg outline-none transition ${
                formik.touched.userinput && formik.errors.userinput
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-yellow-400"
              }`}/>
              {formik.touched.userinput && formik.errors.userinput &&(
                <p className='text-red-500 text-sm mt-1'>
                    {formik.errors.userinput}
                </p>
              )}
              </div>

              <div className='relative'>
             <input 
                type={showPassword?"text":"password"}
                name='password'
                placeholder='Enter your password' 
                value={ formik.values.password}
                 onChange={formik.handleChange} 
                 onBlur={formik.handleBlur} 
                    className={`w-full px-4 py-2 border rounded-lg outline-none transition ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-yellow-400"
              }`}/>
              <button type='button'onClick={()=>setShowPassword(!showPassword)}
                className='absolute right-3 top-2.5 text-gray-500 hover:text-yellow-500'>
                    {showPassword ?<EyeOff className='w-5 h-5'/>:<Eye className='w-5 h-5'/>}
                </button>
              {formik.touched.password &&formik.errors.password &&(
                <p className='text-red-500 text-sm mt-1'>
                    {formik.errors.password}
                </p>
              )}
              </div>
             <button 
             type='submit'
             disabled={formik.isSubmitting}  
                  className={`w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-2 rounded-full font-semibold shadow-md transition-all duration-300 ${
              formik.isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg"
            }`}>
                {formik.isSubmitting ? "Logging in":"Log in"}
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