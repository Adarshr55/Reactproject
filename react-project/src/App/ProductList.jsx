import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SearchBAR from './SearchBAR'
import RatingStar from './RatingStar'
import { CartContest } from './Cartcomponent/CartContest'
import { AuthContest } from '../User-Auth/Authcontest'
import toast from 'react-hot-toast'
import { WishListContext } from './Wishlist/WishlistContext'
import { Heart } from 'lucide-react'
import Pagination from '../components/Pagination'  
import API from '../services/api'

function Product() {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)  
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sort, setSort] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  

  const { isloggedin } = useContext(AuthContest)
  const { addToCart } = useContext(CartContest)
  const { addToWishlist, removeFromWishlist, isWishlisted } = useContext(WishListContext)
  const navigate = useNavigate()

  const fetchProducts = async (page = 1, search = '', sortVal = '', isInitial = false) => {
    try {
      if (isInitial) setLoading(true)
            else setSearching(true)
      const params = new URLSearchParams({ page, page_size: 12 })
      if (category) params.append('category', category)
      if (search) params.append('search', search)
      if (sortVal) params.append('sort', sortVal)

      // const res = await axios.get(
      //   `http://localhost:8000/api/products/?${params}`
      // )
      const res = await API.get(`/products/?${params}`)
      setProducts(res.data.results)
      setCurrentPage(res.data.page)
      setTotalPages(res.data.total_pages)
      setError(null)
    } catch (err) {
      console.error("Error fetching products:", err)
      setError("Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  // ✅ single useEffect — handles category change + resets search
  useEffect(() => {
    setSearchQuery("")    // reset search when category changes
    setCurrentPage(1)
    fetchProducts(1, '', sort,true)
  }, [category])

  // ✅ debounced search — waits 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1)
      fetchProducts(1, searchQuery, sort,false)
    }, 500)
    return () => clearTimeout(timer)   // cancel if user types again
  }, [searchQuery])

  // ✅ sort change — refetch with new sort
  useEffect(() => {
    if (sort) fetchProducts(1, searchQuery, sort,false)
  }, [sort])

  // ✅ page change
  const handlePageChange = (page) => {
    fetchProducts(page, searchQuery, sort,false)
  }

  if (loading) {
    return (
      <div className='py-20 flex justify-center items-center'>
        <p className='text-gray-600 font-medium text-lg animate-pulse'>
          Loading products...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='py-20 text-center'>
        <p className='text-red-500 font-semibold text-lg'>{error}</p>
        <button
          onClick={() => fetchProducts(1, searchQuery, sort)}
          className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition"
        >
          Retry
        </button>
      </div>
    )
  }

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
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700
                     font-medium shadow-sm focus:ring-2 focus:ring-yellow-400 transition"
        >
          <option value="">Sort by</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="nameAz">Name: A-Z</option>
        </select>
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center text-gray-500 text-lg">
          No products found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative bg-white shadow-md rounded-xl overflow-hidden
                           hover:shadow-xl transition duration-300"
              >
                {/* Wishlist */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    if (!isloggedin) return navigate("/login")
                    isWishlisted(product.id)
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product)
                  }}
                  className="absolute top-3 right-3 bg-white rounded-full p-1
                             shadow hover:scale-110 transition"
                >
                  <Heart className={`w-5 h-5 ${
                    isWishlisted(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600"
                  }`} />
                </button>

                <Link to={`/product/${product.id}`}>
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
                      {product.category?.name}
                    </p>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        if (!isloggedin) return navigate("/login")
                        addToCart(product)
                        toast.success(`${product.name} added to cart`)
                      }}
                      className="mt-4 w-full bg-yellow-500 text-white py-2
                                 rounded-lg hover:bg-yellow-600 transition"
                    >
                      Add to cart
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* ✅ reusable Pagination component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  )
}

export default Product