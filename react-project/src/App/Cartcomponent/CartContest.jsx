import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContest } from '../../User-Auth/Authcontest'
import axios from 'axios'
import toast from 'react-hot-toast'
// import { CartContext } from './CartContext'
export const CartContest = createContext()

export const  CartProvider=({children})=> {
  const [loading ,setLoading]=useState(true)  
  const {user,isloggedin}=useContext(AuthContest)
  const [cart,setCart]=useState([])

  useEffect(()=>{
    const loadCart= async()=>{
        if(!isloggedin || !user){
            const localCart = JSON.parse(localStorage.getItem("cart")) || []
            setCart(localCart)
            setLoading(false)
            return
        }
        try{
            const res=await axios.get(`http://localhost:5000/cart?userId=${user.id}`)
            if(res.data.length>0){
                setCart(res.data[0].items ||[])
            }else{
                await axios.post(`http://localhost:5000/cart`,{
                    userId:user.id,
                    items:[]
                })
                setCart([])

            }
        }
        catch (err){
            console.error("error loading data",err)
            // alert("error loading the cart from server ")
            toast.error("error loading data")
        }finally{
            setLoading(false)
        }
    }
    loadCart()
  },[user,isloggedin])

  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])

  const synCartDb= async (upCart)=>{
    if(!isloggedin ||!user) return

    try{
        const res=await axios.get(`http://localhost:5000/cart?userId=${user.id}`)
        if(res.data.length>0){
            const cartid=res.data[0].id;
            await axios.put(`http://localhost:5000/cart/${cartid}`,{
                userId:user.id,
                items:upCart
            })
        }    
    }
    catch(err){
        console.error("Error syncing cart",err)
        // alert("error ")
        toast.error("error syncing cart ")

    }
  }

  const addToCart = async (product,quantity=1)=>{
    const existingitem = cart.find((item)=>item.productId===product.id)
    let upCart;
    if(existingitem){
        upCart=cart.map((item)=>
        item.productId===product.id
        ? {...item,quantity:item.quantity+quantity}
        :item
     );
     toast.dismiss()
     toast.success("quantity updated in the cart")
    }else{
        upCart=[
            ...cart,{
                productId:product.id,
                name:product.name,
                price:product.price,
                thumbnail:product.thumbnail,
                quantity

            }
        ]
        toast.dismiss()
        toast.success(`${product.name}added to cart`)
    }
    setCart(upCart)
    localStorage.setItem("cart", JSON.stringify(upCart))
    await synCartDb(upCart)
  }
  const updateQuntity= async (productId,quantity)=>{
    const upCart=cart.map((item)=>item.productId ===productId ?{...item,quantity}:item
);
    setCart(upCart)
    localStorage.setItem("cart", JSON.stringify(upCart))
    await synCartDb(upCart)
  }
  const removeFromCart=async(productId)=>{
    const upCart=cart.filter((item)=>item.productId !==productId);
    setCart(upCart)
    localStorage.setItem("cart", JSON.stringify(upCart))
    await synCartDb(upCart)
  }
  const clearCart= async ()=>{
    setCart([])
    localStorage.removeItem("cart")
    if(isloggedin && user){
        try{
            const res= await axios.get(`http://localhost:5000/cart?userId=${user.id}`)
            if(res.data.length>0){
                const cartid=res.data[0].id
                await axios.put(`http://localhost:5000/cart/${cartid}`,{
                    userId:user.id,
                    items:[],
                })
            }   
        }
        catch(err){
            console.error("error clearing cart",err)
        }
    }
  }
  const totalItems= cart.reduce((acc,item)=>acc+item.quantity,0);
  const totalPrice=cart.reduce((acc,item)=>acc+item.price *item.quantity,0)

  return(
    <CartContest.Provider value={{cart,loading,addToCart,updateQuntity,removeFromCart,clearCart,totalItems,totalPrice}} >
        {children}
    </CartContest.Provider>
  )
}
