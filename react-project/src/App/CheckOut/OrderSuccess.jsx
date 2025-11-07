import { CheckCircle } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function OrderSuccess() {
    const navigate=useNavigate()
  return (
    <section className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white p-10 md:p-16 rounded-2xl shadow-lg flex flex-col items-center text-center space-y-4"> 
    <CheckCircle className='w-20 h-20 text-green-500 mb-2'/>
    <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>Order Placed Successfully</h1>
    <p className='text-gray-600 text-lg max-w-md'>
        Thank you for shoping with <span className='text-yellow-500 font-semibold'>StrideLux</span>
    </p>
    <button onClick={()=>navigate("/products")} className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-yellow-600 transition">   
        Continue Shopping 
         </button>
    </div>
    </section>
  )
}

export default OrderSuccess