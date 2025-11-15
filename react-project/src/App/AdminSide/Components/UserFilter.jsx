
import React, { useEffect, useState } from 'react'

function UserFilter({users,onFilterChange}) {
const[search,setSearch]=useState("")

useEffect(()=>{
    const term=search.toLowerCase()

    const filtered=users.filter((u)=>
        u.username.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
    );
    onFilterChange(filtered)
},[search,users])
  return (
    <div className='mb-4 flex gap-2'>
        <input
         type='text'
         placeholder='search by username or email'
         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-500 outline-none"
         onChange={(e)=>setSearch(e.target.value)}/>

    </div>
  )
}

export default UserFilter