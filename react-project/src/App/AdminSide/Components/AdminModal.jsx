// import { X } from 'lucide-react'
// import React from 'react'

// function AdminModal({isOpen,onClose,title,children}) {
//     if(!isOpen )return null
//   return (
//     <div className='absolute inset-0 bg-black/30 flex justify-center items-start z-50 py-10'>
//         <div className='bg-white w-full max-w-2xl rounded-xl shadow-xl relative mt-10 '>
//             <div className='flex justify-between items-center px-6 py-4 border-b border-gray-200'>
//                 <h2 className='text-xl font-semibold text-gray-800'>{title}</h2>
//                 <button onClick={onClose} className='text-gray-500 hover:text-gray transition'>
//                     <X className='w-5 h-5'/>
//                 </button>
//             </div>
//             <div className='px-6 py-4 overflow-y-auto flex-1'>{children}</div>



//         </div>

//     </div>
//   )
// }

import { X } from "lucide-react";
import React from "react";

function AdminModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] sm:w-[70%] md:w-[45%] lg:w-[35%] rounded-lg shadow-xl relative p-5">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
          <h2 className="text-base md:text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-1 text-sm text-gray-700 space-y-3">{children}</div>
      </div>
    </div>
  );
}

export default AdminModal;
