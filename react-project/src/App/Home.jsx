import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import NewsLetterSection from './HomeUI/NewsLetterSection'
import Footer from './HomeUI/Footer'
import FeaturedProducts from './HomeUI/FeaturedProducts'
import CategoryShowcase from './HomeUI/CategoryShowcase'
import DealBanner from './HomeUI/DealBanner'

function Home() {
    const navigate=useNavigate()
    const handleshopnow=()=>{
        navigate("/products")
    }


  return (

     <div className="bg-gray-100 w-full min-h-screen  overflow-hidden">
      {/* <Navbar /> */}
  
      <div
        className="relative bg-cover bg-center flex flex-col justify-center items-start px-6 md:px-20 text-white"
        style={{
          backgroundImage:
            "url('https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-hero-image-bg.jpg')",
          height: "80vh",
        }}
      >

        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

         
        <div className="relative z-10 max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Step Into <span className="text-yellow-400">Luxury</span> & Comfort
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            Discover premium handcrafted shoes for men, women, and kids — designed for elegance, performance, and comfort.
          </p>
          <button onClick={handleshopnow}
          className="mt-4 px-8 py-3 bg-yellow-500 text-white font-semibold rounded-full shadow-md hover:bg-yellow-600 hover:shadow-lg transition duration-300">
            Shop Now
          </button>
        </div>


        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
      </div>
      <CategoryShowcase/>
      <FeaturedProducts/>
      <DealBanner/>
      <NewsLetterSection className="mt-12"/>
      <Footer/>
    </div>
    
  )
}

export default Home