import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import RatingStar from './RatingStar'
import QuantitySelector from './QuantitySelector'
import { AuthContest } from '../User-Auth/Authcontest'
import { CartContest } from './Cartcomponent/CartContest'
import toast from 'react-hot-toast'
import { WishListContext } from './Wishlist/WishlistContext'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const [selectedSize, setSelectedSize] = useState(null)
  const [activeImage, setActiveImage] = useState("")

  const navigate = useNavigate()
  const { isloggedin } = useContext(AuthContest)
  const { addToCart } = useContext(CartContest)
  const { addToWishlist, removeFromWishlist, isWishlisted } = useContext(WishListContext)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products/${id}`)
        if (res.data.isActive === false) setError("This product is no longer available")
        else {
          setProduct(res.data)
          setActiveImage(res.data.thumbnail || res.data.images?.[0])
        }
      } catch (err) {
        setError("Product not found")
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddCart = () => {
    if (!isloggedin) {
      toast.error("Please log in to add items to your cart")
      navigate("/login")
      return
    }
    if (!selectedSize) return toast.error("Please select a size first!")
    
    addToCart({ ...product, selectedSize }, quantity)
    toast.success("Product added to cart")
  }

  const handleBuyNow = () => {
    if (!isloggedin) return navigate("/login")
    if (!selectedSize) return toast.error("Please select a size first!")
    
    addToCart({ ...product, selectedSize }, quantity)
    navigate("/checkout")
  }

  if (loading) return <div className="py-20 flex justify-center"><p className="animate-pulse text-gray-600 text-lg">Loading...</p></div>
  if (error || !product) return <div className="py-20 text-center text-red-500 font-semibold">{error || "Product not found"}</div>

  return (
    <section className="pt-20 px-6 md:px-16 py-12 bg-gray-50 min-h-screen">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-700 hover:text-yellow-500 mb-6 transition">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back
      </button>

      <div className="flex flex-col md:flex-row gap-10 bg-white shadow-lg rounded-2xl p-8">

        {/* IMAGE SECTION */}
        <div className="flex-1">
          <img
            src={activeImage}
            alt={product.name}
            className="w-full max-w-md rounded-xl object-cover shadow border"
          />

          {product.images?.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {[product.thumbnail, ...product.images].map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 object-cover rounded cursor-pointer border
                    ${activeImage === img ? "border-yellow-500" : "border-transparent"}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* DETAILS SECTION */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-extrabold text-gray-900">{product.name}</h1>
          <p className="text-xl text-yellow-600 font-semibold">${product.price}</p>
          <RatingStar rating={product.rating} size={22} />
          <p className="text-gray-600 text-sm capitalize">Brand: {product.brand}</p>
          <p className="text-gray-600 text-sm capitalize">Category: {product.category}</p>

          {/* SIZE SELECTOR */}
          {product.sizes && (
            <div>
              <h3 className="font-semibold text-sm text-gray-700 mb-2">Select Size</h3>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-1 text-sm rounded-md border
                      ${selectedSize === size
                        ? "bg-yellow-500 text-white border-yellow-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-yellow-500"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && <p className="text-xs text-red-500 mt-1">* Select a size</p>}
            </div>
          )}

          {product.description && <p className="text-gray-700 mt-2 leading-relaxed">{product.description}</p>}

          <QuantitySelector quantity={quantity} setQuantity={setQuantity} stock={product.stock} />

          {/* ACTION BUTTONS */}
          <div className="space-y-3 mt-6">
            <div className="flex gap-3">
              <button onClick={handleAddCart} className="flex-1 bg-yellow-500 text-white py-2.5 rounded-lg font-medium hover:bg-yellow-600 transition">
                Add to Cart
              </button>

              <button
                onClick={() => {
                  if (!isloggedin) return navigate("/login");
                  isWishlisted(product.id) ? removeFromWishlist(product.id) : addToWishlist(product);
                }}
                className={`flex-1 py-2.5 rounded-lg font-medium transition
                  ${isWishlisted(product.id) ? "bg-red-500 hover:bg-red-600" : "bg-pink-500 hover:bg-pink-600"} text-white`}
              >
                {isWishlisted(product.id) ? "Wishlisted" : "Wishlist"}
              </button>
            </div>

            <button onClick={handleBuyNow} className="w-full bg-green-500 text-white py-2.5 rounded-lg font-medium hover:bg-green-600 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
