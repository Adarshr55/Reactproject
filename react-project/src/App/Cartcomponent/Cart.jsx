import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContest } from './CartContest'
import { ArrowLeft, Trash2 } from 'lucide-react'
import Product from '../ProductList'
import QuantitySelector from '../QuantitySelector'

function Cart() {
  const navigate =useNavigate()
  const { cart,loading ,updateQuntity,removeFromCart,totalItems,totalPrice,clearCart}=useContext(CartContest)


   if(loading){
    return(<div className='py-20 flex justify-center items-center'>
      <p className='text-gray-600  font-medium text-lg animate-pulse'>Loading...</p>
    </div>)
   }
   if(cart.length===0){
    return(
      <div className='py-20 flex flex-col items-center justify-center text-center'>
        <p className='text-gray-500 text-lg mt-4'> your cart is empty.</p>
        <button onClick={()=>navigate("/products")} className='bg-yellow-500 text-white px-6 py-6 rounded-full font-semibold hover:bg-yellow-600 transition'>Shop now</button>
      </div>
    )

   }



  return (
    <section className='pt-24 px-6 md:px-16 py-12 bg-gray-50 min-h-screen'>
      <button onClick={()=>navigate(-1)} className='flex item-center text-gray-700 hover:text-yellow-500 mb-6 transition'>
        <ArrowLeft className='w-5 h-5 mr-2'/>Back
      </button>
      <h1  className='text-gray-900 text-3xl font-bold text-center'> Your shopping cart</h1>
      <div className='bg-white shadow-lg rounded-2xl p-6 md:p-10 space-y-6'>
        {cart.map((items)=>(
          <div key={items.productId} 
           className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 pb-6 mb-6 last:border-none last:mb-0">
            <div className='flex items-center gap-6 w-full sm:w-auto'>
              <img
               src={items.thumbnail}
               alt={items.name}
               className='w-20 h-20 object-cover rounded-xl shadow-sm'
               onError={(e)=>(e.target.src= 'https://via.placeholder.com/100x100?text=Image+Unavailable')}/>
               <div >
                <h3 className='text-gray-800 text-lg font-semibold'>{items.name}</h3>
                <p className='text-yellow-600 font-medium'>{items.price}</p>
               </div>
            </div>
            <div className='flex items-center gap-4 mt-4 sm:mt-0'>
              <QuantitySelector quantity={items.quantity}setQuantity={(newQty)=>updateQuntity(items.productId,newQty)} stock={ items.stock ||10}/>
                <button onClick={()=>removeFromCart(items.productId)} className="text-red-500 hover:text-red-600 transition">
                  <Trash2 className='h-6 w-6'/>
                </button>
            </div>
          </div>
        ))}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 border-t pt-6">
          <p className='text-lg font-semibold text-gray-800'> Total Items:<span className='text-yellow-500'>{totalItems}</span></p>
          <p className='text-2xl font-semibold text-yellow-600'>Total Price:${totalPrice.toFixed(2)}</p>
        </div>
        <div className='flex flex-col sm:flex-row justify-end gap-4 mt-6'>
          <button onClick={clearCart} className="px-8 py-2 rounded-full font-semibold bg-yellow-500 text-white hover:bg-yellow-600 transition">Clear Cart</button>
          <button className="px-8 py-2 rounded-full font-semibold bg-yellow-500 text-white hover:bg-yellow-600 transition">Proceed to Checkout</button>
        </div>
      </div>

    </section>



  )
}

export default Cart