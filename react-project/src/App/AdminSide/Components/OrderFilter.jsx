import React, { useEffect, useState } from 'react'

function OrderFilter({orders,onFilterChange}) {
    const[search,setSearch]=useState("")
    const[status,setStatus]=useState("All")
    useEffect(()=>{
        const term=search.toLowerCase();
        const filtered=orders.filter((o)=>{
            const matchesSearch=
            o.id.toLowerCase().includes(term) ||
            o.username.toLowerCase().includes(term)

            const matchesStatus=status==="All"||o.status===status;
            return matchesSearch && matchesStatus
        })

        onFilterChange(filtered)
    },[search,status,orders])
  return (
    <div className='flex flex-col sm:flex-row gap-3 mb-4'>
        <input
         type='text'
         placeholder='Search useing Order ID and User'
         className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm
               focus:ring-1 focus:ring-yellow-500 outline-none"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}/>

        <select
         value={status}
         onChange={(e)=>setStatus(e.target.value)}
         className="px-3 py-2 border border-gray-300 rounded-md text-sm
                   focus:ring-1 focus:ring-yellow-500 outline-none">
        <option value="All">ALL</option>
        <option value="pending">Pending</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
       </select>
    </div>
  )
}

export default OrderFilter