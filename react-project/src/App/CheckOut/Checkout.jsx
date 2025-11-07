import React, { useContext, useState } from 'react'
import { CartContest } from '../Cartcomponent/CartContest'
import { AuthContest } from '../../User-Auth/Authcontest'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CheckoutContest } from './CheckoutContest'
import OrderSummery from './OrderSummery'

function Checkout() {
    const {cart,totalPrice}=useContext(CartContest)
    const {form,handleChange,handleOrderSubmit,loading,}=useContext(CheckoutContest)


  return (
   <section className='pt-24 px-6 md-16 py-12 bg-gray-50 min-h-screen'>
    <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Checkout</h1>
    <div className='grid md:grid-cols-2 gap-10'>
        <form  onSubmit={handleOrderSubmit}
         className='bg-white p-6 rounded-xl shadow-md space-y-4'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                Shipping Information
                </h2>
                <input 
                type='text'
                name='fullname'
                value={form.fullname}
                placeholder='Full Name'
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                required/>

                <input 
                type='text'
                name='address'
                value={form.address}
                placeholder='Address'
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                required/>

                <input 
                type='text'
                name='city'
                value={form.city}
                placeholder='City'
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                required/>

                <input 
                type='tel'
                name="phone"
                value={form.phone}
                placeholder='Phone'
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                required/>

                <select
                name='payment'
                value={form.payment}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none">
                    <option value="COD">Cash On Delivary</option>
                    <option value="CARD">Credit/Debit Card</option>
                    <option value="UPI">UPI</option>
                </select>
                <button 
                type='submit'
                disabled={loading}
                className="w-full bg-yellow-500 text-white py-3 rounded-full font-semibold hover:bg-yellow-600 transition"
          >
                {loading ?"Placing order":"Place Order"}
                </button>
        </form>
        <div>
            <OrderSummery/>
        </div>
    </div>
   </section>
  )
}

export default Checkout