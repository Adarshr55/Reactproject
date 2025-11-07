import React from 'react'
import { Search } from 'lucide-react'

function SearchBAR({SearchQuery,setSearchQuery}) {
  return (
    <div className='w-full flex justify-center mt-6 mb-10 px-4'>
        <div className='relative w-full max-w-lg'>
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
                type="text"
                placeholder="Search by product name, brand, or category..."         
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                value={SearchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />        
        </div>


    </div>
  )
}

export default SearchBAR  