import axios from 'axios'
import React, {  useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import SearchBAR from './SearchBAR'
// import {  Star } from 'lucide-react'
import RatingStar from './RatingStar'
import { CartContest } from './Cartcomponent/CartContest'
import { AuthContest } from '../User-Auth/Authcontest'
import toast from 'react-hot-toast'

function Product() {
  const{category}=useParams()
  const [products, setProducts]=useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)
  const [searchQuery,setSearchQuery]=useState("")
  const[sort,setSort]=useState("")
  const {isloggedin}=useContext(AuthContest)
  const {addToCart}=useContext(CartContest)
  const navigate=useNavigate()


  useEffect(()=>{
    const fetchProducts=async ()=>{
      try{
        setLoading(true)
        const res=await axios.get("http://localhost:5000/products")
        // setProducts(res.data)
        let data=res.data.filter((item)=>item.isActive !==false)
        if(category){
          data=data.filter((items)=>items.category.toLowerCase()===category.toLowerCase())
        }
        setProducts(data)
        
      }
      catch(err){
        console.error("Error fetching the products :",err)
        setError("failed to load the products ")
      }
      finally{
        setLoading(false)
      }
    }
    fetchProducts()
  },[category])

  useEffect(()=>{
    setSearchQuery("")
  },[category])

  const filteredProducts=products.filter((items)=>{
    const query=searchQuery.toLowerCase()
    return(
      items.name.toLowerCase().includes(query)||
      items.brand.toLowerCase().includes(query)||
      items.category.toLowerCase().includes(query)
    )
  })

  const sortedProducts=[...filteredProducts].sort((a,b)=>{
    if(sort==="priceLowHigh")return a.price-b.price
    if(sort==="nameAz")return a.name.localeCompare(b.name)
    
    return 0
  })

  if(loading){
    return(
    <div className='py-20 flex justify-center items-center'>
      <div className='ext-gray-600 font-medium text-lg animate-pulse'>
        Loading products....

      </div>
    </div>
    );
  }
  if(error){
    return(
      <div className='py-20 flex flex-col justify-center items-center text-center'>
        <p className='text-red-500 font-semibold text-lg'>
          {error}</p>
          <button onClick={window.location.reload()}
          className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition">
            Retry
          </button>
      </div>
    )
  }
  // if(filteredProducts.length===0){
  //   return(
  //      <div className="py-20 text-center text-gray-500 text-lg">
  //       No products available at the moment.
  //     </div>
  //   )
  // }
  return (
  <section className="pt-20 py-12 px-6 md:px-16 bg-gray-50">
    {category && (
  <div className="flex justify-center mb-6">
    <button
      onClick={() => navigate("/products")}
      className="text-yellow-600 font-semibold hover:underline"
    >
      ← View All Products
    </button>
  </div>
)}
    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
      {category ? `${category} Products` : "Our Featured Products"}
    </h1>

    <div className="flex justify-center mb-8">
      <SearchBAR searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>

    <div className="flex justify-end mb-8">
      <select
        onChange={(e) => setSort(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 font-medium shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
      >
        <option value="">Sort by</option>
        <option value="priceLowHigh">Price: Low to High</option>
        <option value="nameAz">Name: A-Z</option>
      </select>
    </div>

    {filteredProducts.length === 0 ? (
      <div className="py-20 text-center text-gray-500 text-lg">
        No products found for your search.
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sortedProducts.map((product) => {
  //         console.log(
  //   "PRODUCT RATING:",
  //   product.rating,
  //   "TYPE:",
  //   typeof product.rating,
  //   "FULL PRODUCT:",
  //   product
  // );

          return(
          <Link key={product.id} to={`/product/${product.id}`}>
            <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-60 object-cover"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/300x300?text=Image+Unavailable")
                }
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
          
                <RatingStar rating={Number(product.rating)} size={16} />
                <p className="text-gray-500 mt-1">${product.price}</p>
                <p className="text-sm text-yellow-600 capitalize mt-1">
                  {product.brand}
                </p>
                <p className="text-sm text-yellow-500 capitalize mt-1">
                  {product.category}
                </p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (!isloggedin) {
                      toast.error("Please log in");
                      navigate("/login");
                      return;
                    }
                    addToCart(product);
                    toast.success(`${product.name} added to cart`);
                  }}
                  className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </Link>
         )})}
      </div>
    )}
  </section>
);

}

export default Product
