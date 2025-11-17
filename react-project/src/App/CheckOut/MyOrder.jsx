    import React, { useContext, useEffect, useState } from 'react'
    import { AuthContest } from '../../User-Auth/Authcontest'
    import { useNavigate } from 'react-router-dom'
    import axios from 'axios'
    import OrderSummery from './OrderSummery'

    function MyOrder() {
        const {user}=useContext(AuthContest)
        const navigate=useNavigate()
        const[order,setOrder]=useState([])
        const[loading,setLoading]=useState(true)
        const[error,setError]=useState(null)

        useEffect(()=>{
            if(!user){
                navigate("/login")
                return
            }
            const fetchOrder =async ()=>{
                try{
                    const res=await axios.get(`http://localhost:5000/orders?userId=${user.id}`)
                    setOrder(res.data)
                }
                catch (err){
                        console.error("Error fetching odder: ",err)
                        setError("failed to load  your order ")
                }
                finally{
                    setLoading(false)
                }
            }
            fetchOrder()
        },[user,navigate])
        
        if(loading){
            return(
                <section className="pt-24 min-h-screen flex items-center justify-center bg-gray-50">
                    <p className="pt-24 min-h-screen flex items-center justify-center bg-gray-50"> Loading your orders</p>
                </section>
            )
        }
        if(error){
            <section className= "pt-24 min-h-screen flex items-center justify-center bg-gray-50">
                <p className="pt-24 min-h-screen flex items-center justify-center bg-gray-50"> {error}</p>
            </section>
        }
        if(order.length===0){
            return(
                <section className="pt-24 min-h-screen flex items-center justify-center bg-gray-50">
                    <p className="text-gray-600 text-lg"> your haven't placed any order yet</p>
                </section>
            )
        }

        const statusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "shipped":
        return "bg-blue-100 text-blue-600";
      case "delivered":
        return "bg-green-100 text-green-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
};


    return (
        <section className="pt-24 px-6 md:px-16 py-12 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                My Order
            </h1>
            <div className='space-y-8'>
                {order.map((order)=>(
                    <div key={order.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition space-y-4">
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Order ID:{order.id}</span>
                            <span>{new Date(order.createdAt).toLocaleString()}</span>
                        </div>
                        <div className='flex justify-between items-center'> 
                            <span className='text-sm font-medium text-gray-800'>status:
                                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${statusBadgeClass(order.status)}`}>
                                    {order.status}
                    </span>
                    </span>
                    <span className='font-semibold text-gray-800'>
                        {order.total.toFixed(2)}
                        </span>
                        </div>
                        <OrderSummery cart={order.items} total={order.total} title={false}/>
                        <div className='text-right'>
                            <button onClick={()=>navigate(`/order/${order.id}`)} className='mt-3 text-sm font-medium text-yellow-600 hover:underline'> View Details</button>
                    </div>
                    </div>
                ))}
            </div>

        </section>
    )
    }

    export default MyOrder