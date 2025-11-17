import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContest } from '../../User-Auth/Authcontest'
import axios from 'axios'
import { confirmToast } from '../AdminSide/Components/Utilites/ConfirmToast'
import toast from 'react-hot-toast'

function OrderDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContest)

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const steps = ["pending", "shipped", "delivered"]   // ✔ moved outside of cancelOrder

  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }

    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/orders/${id}`)
        setOrder(res.data)
      } catch (error) {
        setError("Order not found")
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [user, id, navigate])


  const cancelOrder = async () => {
    confirmToast("Are you sure you want to cancel the order?", async () => {
      try {
        await axios.patch(`http://localhost:5000/orders/${id}`, { status: "cancelled" })
        toast.success("Order Cancelled Successfully")
        navigate("/myorder")
      } catch (err) {
        toast.error("Failed to cancel the order")
      }
    })
  }

  // ✔ Correct loading & error returns
  if (loading)
    return <p className="text-gray-500 pt-24 min-h-screen flex justify-center">Loading...</p>

  if (error)
    return <p className="text-gray-500 pt-24 min-h-screen flex justify-center">{error}</p>


  return (
    <section className='pt-24 px-6 md:px-16 py-12 bg-gray-50 min-h-screen'>
      <button
        onClick={() => navigate(-1)}
        className='mb-6 text-yellow-500 hover:underline'
      >
        Back
      </button>

      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Order Details</h1>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <div className="flex justify-between text-sm text-gray-500">
          <span><b>Order ID:</b> {order.id}</span>
          <span>{new Date(order.createdAt).toLocaleString()}</span>
        </div>
{/* Order Tracking (Vertical Progress) */}
<h2 className="font-semibold text-gray-700 mt-2">Order Tracking</h2>

<div className="mt-4 ml-6 relative">

  <div className="flex flex-col relative">

    {steps.map((step, i) => {
      const active = steps.indexOf(order.status) >= i;
      const nextActive = steps.indexOf(order.status) >= i + 1;
      const isLast = i === steps.length - 1;

      return (
        <div key={i} className="relative pl-6 pb-8">

          {/* Bullet */}
          <span
            className={`absolute -left-[6px] top-1 w-4 h-4 rounded-full border-2 z-10
            ${active ? "bg-green-500 border-green-500" : "bg-gray-300 border-gray-400"}`}
          ></span>

          {/* Connecting Line (auto height + flush to bullet) */}
          {!isLast && (
            <span
              className={`absolute left-[4px] top-1 bottom-0 w-[2px]
              ${nextActive ? "bg-green-500" : "bg-gray-300"}`}
            ></span>
          )}

          {/* Status Text */}
          <p className={`font-medium text-sm capitalize ${active ? "text-green-600" : "text-gray-500"}`}>
            {step}
          </p>

          {/* Description */}
          <p className="text-xs text-gray-500 mt-1 leading-tight">
            {step === "pending" && "Order received and processing"}
            {step === "shipped" && "Order picked by courier and in transit"}
            {step === "delivered" && "Order delivered successfully"}
          </p>

        </div>
      );
    })}

  </div>
</div>



        <h2 className="font-semibold text-gray-700 mt-4">Order Items</h2>
        <div className="space-y-2">
          {order.items.map(item => (
            <div key={item.productId} className="flex justify-between border-b py-2 text-sm">
              <span>{item.title} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="text-right font-bold text-gray-800 text-lg pt-3">
          Total: ${order.total.toFixed(2)}
        </div>

        {(order.status === "pending" || order.status==="shipped")&&(
          <button 
            onClick={cancelOrder}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
          >
            Cancel Order
          </button>
        )}
      </div>
    </section>
  )
}

export default OrderDetails
