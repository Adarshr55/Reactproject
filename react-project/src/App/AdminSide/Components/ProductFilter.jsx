import React, { useEffect, useState } from 'react'

function ProductFilter({products,onFilterchange}) {
    const [searchTerm,setSearchTerm]=useState("")
    const [category,setCategory]=useState("All")

    const categories=[
        "All",
        ...new Set(products.map((p)=>p.category?.trim()||"Uncategorized"))
    ]

    useEffect(()=>{
        const filtered=products.filter((p)=>{
            const matchesSearch=
            p.name.toLowerCase().includes(searchTerm.toLowerCase())||
            p.brand.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory=
            category==="All"||p.category===category;
            return matchesSearch && matchesCategory
        })
        onFilterchange(filtered)
    },[searchTerm,category])

  return (
    <div className='flex flex-col sm:flex-row gap-3 mb-5'>
        <input
          type='text'
          placeholder='search by name brand category...'
          onChange={(e)=>setSearchTerm(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-1 focus:ring-yellow-400 outline-none"/>

          <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
           className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-1 focus:ring-yellow-400 outline-none">
           {categories.map((c)=>(
            <option key={c} value={c}>
                {c}
            </option>
           ))}
           </select>

    </div>
  )
}

export default ProductFilter