import React, { useContext } from 'react'
// import { CheckoutContest } from './CheckoutContest'
import { CartContest } from '../Cartcomponent/CartContest'

function OrderSummery({cart:propcart,total:propTotal,title=true}) {
    const {cart:ctxCart,totalPrice}=useContext(CartContest)
     const cart=propcart ||ctxCart
     const total=typeof propTotal==="number"? propTotal : totalPrice  
    if(!cart ||cart.length===0){
        return(
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <p className='text-gray-600'>your cart is empty</p>

            </div>
        )
    }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between h-full"> 
    { title &&(
    <h2 className="text-xl font-semibold text-gray-800 text-center mb-4 border-b pb-3">
        Order Summary
    </h2>
    )}
    <div className='space-y-4'>
        {cart.map((item)=>( 
            <div
            key={item.productId}
            className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-none">
                <div className='flex items-center gap-3'>
                    <img
                     src={item.thumbnail}
                     alt={item.name}
                     className='w-12 h-12 rounded-md object-cover shadow-sm'
                     onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/60x60?text=No+Image")
                }/>
                <div>
                <p className='text-gray-800 font-mediu'>{item.name}</p>
                <p className='text-sm text-gray-500'>Qty:{item.quantity}</p>
                </div>
                </div>
                <p className='text-gray-800 font-semibold'>
                    ${(item.price * item.quantity).toFixed(2)}
                </p>
                </div>
        ))}
    </div>
    <div className='mt-6 border-t border-gray-200 pt-4'>
        <div className="flex justify-between text-lg font-semibold text-gray-800">
    
        <span>Total:</span><span className='text-yellow-600'>${total.toFixed(2)}</span> 
        </div>
    </div>
    </div>
  )
}

export default OrderSummery