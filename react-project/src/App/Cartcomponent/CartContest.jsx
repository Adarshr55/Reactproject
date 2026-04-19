import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContest } from '../../User-Auth/Authcontest'
import axios from 'axios'
import toast from 'react-hot-toast'
import API from '../../services/api'

export const CartContest = createContext()

// ✅ axios instance with JWT token
// const API = axios.create({ baseURL: 'import.meta.env.VITE_API_URL || "http://localhost:8000/api"' })
// API.interceptors.request.use((config) => {
//     const token = localStorage.getItem('access')
//     if (token) config.headers.Authorization = `Bearer ${token}`
//     return config
// })

export const CartProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const { user, isloggedin } = useContext(AuthContest)
    const [cart, setCart] = useState([])

    // load cart on login
    useEffect(() => {
        const loadCart = async () => {
            if (!isloggedin || !user) {
                // ✅ not logged in — use localStorage
                const localCart = JSON.parse(localStorage.getItem("cart")) || []
                setCart(localCart)
                setLoading(false)
                return
            }
            try {
                // ✅ call Django
                const res = await API.get('/cart/')
                setCart(res.data.items || [])
            } catch (err) {
                console.error("Error loading cart", err)
                toast.error("Error loading cart")
            } finally {
                setLoading(false)
            }
        }
        loadCart()
    }, [user, isloggedin])

    // save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = async (product, quantity = 1) => {
        if (!isloggedin) {
            // ✅ not logged in — local only
            const existingItem = cart.find(item => item.productId === product.id)
            let upCart
            if (existingItem) {
                upCart = cart.map(item =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
                toast.success("Quantity updated")
            } else {
                upCart = [...cart, {
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    quantity
                }]
                toast.success(`${product.name} added to cart`)
            }
            setCart(upCart)
            return
        }

        try {
            // ✅ call Django
            const res = await API.post('/cart/add/', {
                product_id: product.id,
                quantity,
                selected_size: product.selectedSize || null
            })
            setCart(res.data.items || [])
            // toast.success(`${product.name} added to cart`)
        } catch (err) {
            console.error("Error adding to cart", err)
            toast.error("Error adding to cart")
        }
    }

    const updateQuntity = async (itemId, quantity) => {
        if (!isloggedin) {
            const upCart = cart.map(item =>
                item.productId === itemId ? { ...item, quantity } : item
            )
            setCart(upCart)
            return
         
        }
           
            setCart(prev =>
                prev.map(item =>
                  item.id === itemId ? { ...item, quantity } : item
                 )
               )
        try {
            // ✅ call Django — itemId is cart item id
            API.patch(`/cart/item/${itemId}/`, { quantity })
        } catch (err) {
            console.error("Error updating quantity", err)
            toast.error("Error updating quantity")
             const res = await API.get('/cart/')
             setCart(res.data.items || [])
        }
    }

    const removeFromCart = async (itemId) => {
        if (!isloggedin) {
            const upCart = cart.filter(item => item.productId !== itemId)
            setCart(upCart)
            return
        }
        setCart(prev => prev.filter(item => item.id !== itemId))
        try {
            // ✅ call Django
            await API.delete(`/cart/item/${itemId}/`)
             const res = await API.get('/cart/')
             setCart(res.data.items || [])

        } catch (err) {
            console.error("Error removing from cart", err)
            toast.error("Error removing item")
        }
    }

    const clearCart = async () => {
        setCart([])
        localStorage.removeItem("cart")
        if (!isloggedin) return
        try {
            // ✅ call Django
            await API.delete('/cart/')
        } catch (err) {
            console.error("Error clearing cart", err)
        }
    }

    // ✅ handle both local cart (productId) and Django cart (item.product)
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
    const totalPrice = cart.reduce((acc, item) =>
        acc + Number(item.product?.price || item.price) * item.quantity, 0
    )

    return (
        <CartContest.Provider value={{
            cart, loading, addToCart, updateQuntity,
            removeFromCart, clearCart, totalItems, totalPrice
        }}>
            {children}
        </CartContest.Provider>
    )
}