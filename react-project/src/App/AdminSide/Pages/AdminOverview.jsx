import { DollarSign, Package, ShoppingCart,  Users } from 'lucide-react'
import React from 'react'

function AdminOverview() {
    const stats=[
        {title:"Total Products",value:120,icon:<Package className='w-5 h-6'/>},
        {title:"Total Users",value:40,icon:<Users className='w-5 h-6'/>},
        {title:"Total Orders",value:10,icon:<ShoppingCart className='w-5 h-6'/>},
        {title:"Total Revenue",value:120,icon:<DollarSign className='w-5 h-6'/>}

    ]
  return (
    <div className='space-y-6'>
        <h1 className='text-2xl font-semibold text-gray-800'>DashBoard Overview</h1>
        <div className='grid grid-cols-1 sm:grid-2 lg:grid-cols-4 gap-6'>
            {stats.map((items,index)=>(
                <div key={index}
                className='bg-white border rounded-lg p-5 flex items-center justify-between  shadow-sm'>
                    <div>
                        
                        <h4 className='text-sm text-gray-500'>{items.title}</h4>
                        <p className='text-xl font-bold text-gray-800'>{items.value}</p>
                        </div>
                        <div> {items.icon}</div>
                        </div>
            ))}
        </div>
    </div>
  )
}

export default AdminOverview