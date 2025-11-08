import React, { useState } from 'react'
import toast from 'react-hot-toast';

function NewsLetterSection() {
    const[email,setEmail]=useState("")
    const [submitted,setSubmitted]=useState(false)

   const handleSubmit=(e)=>{
    e.preventDefault();
    if(!email.trim()){
        toast.success("please enter your email")
        return
    }
        setSubmitted(true)
        setEmail("")
        toast.success("you're Subscribed!")

   }
  return (
     <section className='bg-yellow-50 py-16 px-6 md:px-16 text-center'>
        <h2 className='text-3xl font-bold text-gray-800 mb-3'>Stay in the<span className='text-gray-500'>Loop</span></h2>
        <p className='text-gray-600 mb-8 text-lg max-w-lg mx-auto'>   Subscribe to get exclusive offers, early access to new collections, and style updates.  
        </p>
        {submitted?(
            <p className='text-green-600 font-semibold'>
                you're subscribed! thank you for  joining StrideLux
            </p>
        ):(
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
                <input
                 type='email'
                 placeholder='Enter your email address'
                 onChange={(e)=>setEmail(e.target.value)}
                  className="w-full sm:w-auto flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"/>
                  <button type='submit' className="px-8 py-3 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition">
                    Subscribe
                  </button>
              </form>
        )}  
     </section>
  )
}

export default NewsLetterSection