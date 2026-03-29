import React, { createContext, useContext, useState } from 'react'
import { CartContest } from '../Cartcomponent/CartContest'
import { AuthContest } from '../../User-Auth/Authcontest'
import { useNavigate } from 'react-router-dom'
import API from '../../services/api'
import toast from 'react-hot-toast'

export const CheckoutContest = createContext()

export const CheckoutProvider = ({ children }) => {
    const { cart, totalPrice, clearCart } = useContext(CartContest)
    const { user } = useContext(AuthContest)
    const navigate = useNavigate()

    const [form, setForm] = useState({
        fullname: "",
        address: "",
        city: "",
        phone: "",
        payment: "COD"
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    
    const openRazorpay = (paymentData, orderId) => {
        const options = {
            key: paymentData.key,
            amount: paymentData.amount,
            currency: paymentData.currency,
            name: "StrideLux",
            description: `Order #${orderId}`,
            order_id: paymentData.razorpay_order_id,
            prefill: {
                name: paymentData.name,
                email: paymentData.email,
                contact: paymentData.phone,
            },
            theme: { color: "#EAB308" },  

            
            handler: async (response) => {
                try {
                    await API.post(`/orders/${orderId}/verify-payment/`, {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    })

                    clearCart()
                    toast.success("Payment successful! Order placed.")
                    navigate("/order-success")

                } catch (err) {
                    console.error("Payment verification failed", err)
                    toast.error("Payment verification failed")
                }
            },

            
            modal: {
                ondismiss: () => {
                    toast.error("Payment cancelled")
                    setLoading(false)
                }
            }
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const handleOrderSubmit = async (e) => {
        e.preventDefault()

        if (cart.length === 0) {
            toast.error("Your cart is empty")
            return
        }

        setLoading(true)

        try {
            
            const orderRes = await API.post('/orders/', {
                fullname: form.fullname,
                address: form.address,
                city: form.city,
                phone: form.phone,
                payment: form.payment
            })

            const orderId = orderRes.data.id


            if (form.payment === 'COD') {
                clearCart()
                toast.success("Order placed successfully!")
                navigate("/order-success")
                return
            }

            
            const paymentRes = await API.post(
                `/orders/${orderId}/create-payment/`
            )

            openRazorpay(paymentRes.data, orderId)

        } catch (err) {
            console.error("Error placing order", err)
            toast.error("Failed to place order")
            setLoading(false)
        }

      
    }

    return (
        <CheckoutContest.Provider value={{
            form, handleChange, handleOrderSubmit, loading
        }}>
            {children}
        </CheckoutContest.Provider>
    )
}

