import React from 'react'
import { Star } from 'lucide-react'

function RatingStar({rating,size=5}) {
  return (
    <div className='flex items-center'>
            {[...Array(5)].map((_,i)=>(
                <Star
                key={i}
                className={`${i<Math.round(rating)?"text-yellow-400 fill-yellow-400":"text-gray-300"
                }`}  style={{width:size,height:size}} />
            ))}
            <span className='ml-2 text-gray-600 text-sm'>{rating.toFixed(1)}</span>

          </div>
  )
}

export default RatingStar
