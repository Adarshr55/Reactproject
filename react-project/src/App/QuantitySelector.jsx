import React from 'react'

function QuantitySelector({quantity,setQuantity ,stock}) {
    const handleQuantitychange =(newQty)=>{
      if(typeof setQuantity==="function"){
        if(setQuantity.length===1){
          setQuantity(newQty)
        }else{
          setQuantity(newQty)
        }
      }
    }

  const increaseQty=()=> { 
    if(quantity<stock)handleQuantitychange( quantity +1)
    }
  const decreaseQty=()=> {
   if(quantity>1) handleQuantitychange( quantity-1)
  }
  return (
    <div className='flex items-center gap-4 mt-6'>
      <button onClick={decreaseQty}
        disabled={quantity <=1}
       className={` w-10 h-10 flex items-center justify-center  text-xl font-bold rounded-full 
        ${quantity <=1 
          ? "bg-gray-100 text-gray-400 cursor-not-allowed": "bg-gray-200 text-gray-700 hover:bg-yellow-400 hover:text-white"
        }`}
        >
        -
      </button>
      <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
       <button onClick={increaseQty}
       disabled={quantity>=stock}
      className={`w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold transition 
          ${quantity >= stock 
            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
            : "bg-gray-200 text-gray-700 hover:bg-yellow-400 hover:text-white"}`}
      >
        +
      </button>
      <span className='text-sm text-gray-500  ml-2'>{stock ?`(${stock} in stock )`:""}</span>

    </div>
  )
}

export default QuantitySelector