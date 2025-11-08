import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Star } from 'lucide-react'
import RatingStar from './RatingStar'
import QuantitySelector from './QuantitySelector'
import { AuthContest } from '../User-Auth/Authcontest'
import { CartContest } from './Cartcomponent/CartContest'
import toast from 'react-hot-toast'


function ProductDetails() {
    const {id}=useParams()
    const[product, setProduct] = useState(null)
    const[loading,setLoading]=useState(true)
    const[error,setError]=useState(null) 
    const[quantity,setQuantity]=useState(1)  
    const navigate=useNavigate()
    const {isloggedin}=useContext(AuthContest)
    const{ addToCart}=useContext(CartContest)

    useEffect(()=>{
        const fetchProduct=async ()=>{
            try{
                const res=await axios.get(`http://localhost:5000/products/${id}`)
                setProduct(res.data)
            }catch(err){
                console.error("Error fetching",err)
                setError("product not found")
            }
            finally{
                setLoading(false)
            }
        }
        fetchProduct()
    },[id])
    // console.log("ID parms",id)
    // console.log("fetch",product)

    const handleAddCart=()=>{
        if(!isloggedin){
            // alert("please log in to add items to your cart")
            toast.error("Please log in to add items to your cart")
            navigate("/login")
            return
        }
        addToCart(product,quantity)
        // alert("product add to cart")
        toast.success("product add to cart")
    }
    if(loading){
        return(
            <div className='py-20 flex justify-center items-center '> 
            <p className='text-gray-600 font-medium text-lg animate-pulse'>Loading....</p>
            </div>
        )
    }
    if(error ||!product){
        return(
            <div className='py-20 text-center text-red-500 test-lg font-semibold'>
                {error||"Product not found"}
            </div>
        )
    }
  return (
    <section className='pt-20 px-6 md:px-16 py-12 bg-gray-50 min-h-screen'>
        <button onClick={()=>navigate(-1)}
          className="flex items-center text-gray-700 hover:text-yellow-500 mb-6 transition">
            <ArrowLeft className='w-5 h-5 mr-2'/>Back
        </button>

        <div className='flex flex-col md:flex-row gap-10 bg-white shadow-lg rounded-2xl p-8'>
            <div className='flex-1 flex justify-center'>
                <img
                  src={product.thumbnail}
                  alt={product.name}
                   className="w-full max-w-md rounded-xl object-cover shadow-md"
            onError={(e) => (e.target.src = "https://via.placeholder.com/400x400?text=Image+Unavailable")}
          />
           </div>
           <div className='flex-1 space-y-4'>
          <h1 className="text-3xl font-extrabold text-gray-900">{product.name}</h1>
          <p className="text-xl text-yellow-600 font-semibold">${product.price}</p> 
            <RatingStar rating={product.rating} size={22}/>  
          <p className="text-gray-600 text-sm capitalize">Brand: {product.brand}</p>
          <p className="text-gray-600 text-sm capitalize">Category: {product.category}</p>

          {product.description && (
            <p  className='text-gray-700 mt-4 leading-relaxed'>
            {product.description}</p>
          )}
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} stock={product.stock}/>

          <button onClick={handleAddCart} className="mt-6 bg-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-600 transition">Add to cart</button>
          <button onClick={()=>{
            if(!isloggedin){
                // alert("please log in ")
                toast.error("Please log in")
                navigate("/login")
                return
            }
            addToCart(product,quantity)
            navigate("/checkout")
          }} className="flex-1 bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition"> Buy NOW </button>

           </div>
        </div>
    </section>
  )
}

export default ProductDetails