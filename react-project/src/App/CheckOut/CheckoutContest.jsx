import React, { createContext, useContext, useState } from 'react'
import { CartContest } from '../Cartcomponent/CartContest'
import { AuthContest } from '../../User-Auth/Authcontest'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

export const CheckoutContest=createContext()
 export const CheckoutProvider=({children})=>{
    const {cart,totalPrice,clearCart}=useContext(CartContest)
    const {user}=useContext(AuthContest)
    const navigate=useNavigate()

    const [form,setForm]=useState({
        fullname:"",
        address:"",
        city:"",
        phone:"",
        payment:"COD"

    });

    const [loading,setLoading]=useState(false)

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleOrderSubmit= async(e)=>{
        e.preventDefault()
        if(cart.length===0){
            // alert("you cart is empty")
            toast.error("toy cart is empty")
            return
        }
        setLoading(true)
        try{
            const orderData={
                userId:user.id,
                username:user.username,
                items:cart,
                total:totalPrice,
                address:form,
                createdAt:new Date().toString(),
                status:"pending"
            }
            await axios.post(`http://localhost:5000/orders`,orderData)
            clearCart()
            // alert("order placed succefully")
            toast.success("order placed successfully")
            navigate("/order-success")
        }
        catch(err){
            console.error("error order placing ",err)
            // alert("failed to place the order")
            toast.error("faild to place the order")
        }
        finally{
            setLoading(false)
        }

    }
    return(
        <CheckoutContest.Provider value={{form,handleChange,handleOrderSubmit,loading}}>
            {children}

        </CheckoutContest.Provider>
    )
 }
