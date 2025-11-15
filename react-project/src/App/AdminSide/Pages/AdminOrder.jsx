import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AdminOrder() {
    const [orders,setOrders]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [selectedOrder,setSelectedOrder]=useState(null)
    const [isModalOpen,setIsModalOpen]=useState(false)

    const handleSelectOrder=(order)=>{
        setSelectedOrder(order)
        setIsModalOpen(true)
    }


    const fetchOrders= async()=>{
        try{
            setLoading(true)
            const res=await axios.get("http://localhost:5000/orders")
            setOrders(res.data)
            setError(null)
            // console.log(res.data)
        }catch(err){
            console.log("Error Fetching the order",err)
            setError("Failed to load the order")
        }finally{
            setLoading(false)
        }
    }


    useEffect(()=>{
        fetchOrders()
    },[])
  return (
    <div className='p-4'>
        <h2 className='text-xl font-semibold mb-4'>Order Mangement</h2>

        {loading &&<p className='text-gray-500'>Loading...</p>}
        {error &&<p className='text-red-500'>{error}</p>}

        {!loading && !error &&(
            <div className='overflow-x-auto border shadow-md rounded-lg'>
                <table className='w-full text-sm'>
                    <thead className='bg-gray-100 text-gray-700 uppercase text-xs'>
                        <tr>
                            <th className='px-4 py-3 text-left'>Order Id</th>
                            <th className='px-4 py-3 text-left'>User</th>
                            <th className='px-4 py-3 text-left'>Total</th>
                            <th className='px-4 py-3 text-left'>status</th>
                            <th className='px-4 py-3 text-left'>date</th>
                            <th className='px-4 py-3 text-left'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='"px-4 py-3 text-left'>
                        {orders.map((o)=>(
                            <tr key={o.id} className="hover:bg-gray-50 cursor-pointer transition"
                              onClick={()=>handleSelectOrder(o)}>
                                <td className='px-4 py-3 font-medium text-gray-900'>{o.id}</td>
                                <td className='px-4 py-3'>{o.username}</td>
                                <td className='px-4 py-3'>${o.total.toFixed(2)}</td>
                                <td className='px-4 py-3 capitalize'><span className='px-2 py-1 rounded-md bg-yellow-500 text-yellow-700 text-xs'>
                                    {o.status}
                                    </span>
                                    </td>
                                    <td className='px-4 py-3'>{new Date(o.createdAt).toLocaleString()}</td>    
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>


        )}

    </div>
  )
}

export default AdminOrder