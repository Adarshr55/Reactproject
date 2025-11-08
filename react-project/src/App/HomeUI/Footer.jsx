import React from 'react'
import {Link} from "react-router-dom"
import{ Facebook ,Instagram,Twitter,Mail}from"lucide-react"


function Footer() {
  return (
    <footer className='bg-gray-900 text-gray-300 py-12 px-6 md:px-16'>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
                <h2 className="text-2xl font-extrabold text-white mb-3">Stride<span className='text-yellow-500'>Lux</span></h2>
                 <p className="text-gray-400 text-sm leading-relaxed">
            Step into luxury & comfort. Explore premium handcrafted footwear for every occasion.
          </p>
            </div>
            <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
             <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/products/men" className="hover:text-yellow-500">Men</Link></li>
            <li><Link to="/products/women" className="hover:text-yellow-500">Women</Link></li>
            <li><Link to="/products/kids" className="hover:text-yellow-500">Kids</Link></li>
            <li><Link to="/products/sports" className="hover:text-yellow-500">Sports</Link></li>
            <li><Link to="/cart" className="hover:text-yellow-500">Cart</Link></li>
          </ul>
            </div>
            <div>
             <h3 className="text-white font-semibold mb-4">Customer Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-yellow-500">Contact Us</a></li>
              <li><a href="#" className="hover:text-yellow-500">FAQs</a></li>
            <li><a href="#" className="hover:text-yellow-500">Returns & Refunds</a></li>
           </ul>
            </div>
            <div>
         <h3 className="text-white font-semibold mb-4">Follow Us</h3>
           <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-yellow-500"><Facebook /></a>
            <a href="#" className="hover:text-yellow-500"><Instagram /></a>
            <a href="#" className="hover:text-yellow-500"><Twitter /></a>
            <a href="#" className="hover:text-yellow-500"><Mail /></a>
          </div>
            </div>
        </div>
        <p className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} StrideLux. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer