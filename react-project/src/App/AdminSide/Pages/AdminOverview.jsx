import axios from 'axios'
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import OrderStatusDonut from '../Components/OrderStatusDonut'
import RevenueLineChart from '../Components/RevenueLineChart'
import API from '../../../services/api'

function AdminOverview() {
    const[loading ,setLoading]=useState(true)
    const[error,setError]=useState(null)
    const[stats, setStats] = useState(null)
    const[viewMode,setViewMode]=useState("overall")


    useEffect(()=>{
        const fetchStats=async()=>{
            try{
                setLoading(true)
                const res = await API.get('/admin/stats/')
                setStats(res.data)
            }catch(err) {
              console.error("Overview fetch error:", err)
              setError("Failed to load dashboard info")
            }finally{
              setLoading(false)
            }
          }
          fetchStats()
        },[])
;

  

   
  if (loading)
    return <p className="p-6 text-gray-600">Loading dashboard...</p>;

  if (error)
    return <p className="p-6 text-red-500">{error}</p>;
   if (!stats) return null

  return (
    <div className="space-y-6 p-4 overflow-y-auto max-h-[calc(100vh-90px)]">

      <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  
  {/* Total Products */}
  <div className="rounded-lg p-5 shadow-sm text-white bg-[#3B82F6] flex justify-between items-center">
    <div>
      <h4 className="text-sm opacity-90">Total Products</h4>
      <p className="text-2xl font-bold">{stats.total_products}</p>
    </div>
    <div className="p-2 bg-white/20 rounded-full">
      <Package className="w-6 h-6" />
    </div>
  </div>

  {/* Total Users */}
  <div className="rounded-lg p-5 shadow-sm text-white bg-[#22C55E] flex justify-between items-center">
    <div>
      <h4 className="text-sm opacity-90">Total Users</h4>
      <p className="text-2xl font-bold">{stats.total_users}</p>
    </div>
    <div className="p-2 bg-white/20 rounded-full">
      <Users className="w-6 h-6" />
    </div>
  </div>

  {/* Total Orders */}
  <div className="rounded-lg p-5 shadow-sm text-white bg-[#F59E0B] flex justify-between items-center">
    <div>
      <h4 className="text-sm opacity-90">Total Orders</h4>
      <p className="text-2xl font-bold">{stats.total_orders}</p>
    </div>
    <div className="p-2 bg-white/20 rounded-full">
      <ShoppingCart className="w-6 h-6" />
    </div>
  </div>

  {/* Total Revenue */}
  <div className="rounded-lg p-5 shadow-sm text-white bg-[#8B5CF6] flex justify-between items-center">
    <div>
      <h4 className="text-sm opacity-90">Total Revenue</h4>
      <p className="text-2xl font-bold">${Number(stats.total_revenue).toFixed(2)}</p>
    </div>
    <div className="p-2 bg-white/20 rounded-full">
      <DollarSign className="w-6 h-6" />
    </div>
  </div>

</div>

      {/* <h2 className="text-xl font-semibold text-gray-800 mt-8">
  Order Status Overview
</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">

  <div className="rounded-lg p-4 shadow-sm bg-[#FBBF24] text-white">
    <h3 className="text-sm">Pending Orders</h3>
    <p className="text-2xl font-bold">{pendingCount}</p>
  </div>

  <div className="rounded-lg p-4 shadow-sm bg-[#3B82F6] text-white">
    <h3 className="text-sm">Shipped Orders</h3>
    <p className="text-2xl font-bold">{shippedCount}</p>
  </div>

  <div className="rounded-lg p-4 shadow-sm bg-[#22C55E] text-white">
    <h3 className="text-sm">Delivered Orders</h3>
    <p className="text-2xl font-bold">{deliveredCount}</p>
  </div>

  <div className="rounded-lg p-4 shadow-sm bg-[#EF4444] text-white">
    <h3 className="text-sm">Cancelled Orders</h3>
    <p className="text-2xl font-bold">{cancelledCount}</p>
  </div>

</div> */}


  {/* Monthly Summary */}
<h2 className="text-xl font-semibold text-gray-800 mt-10">This Month Overview</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">

  {/* Orders This Month */}
  <div className="rounded-lg p-4 shadow-sm bg-[#8B5CF6] text-white">
    <h3 className="text-sm">Orders This Month</h3>
    <p className="text-2xl font-bold">{stats.monthly_orders}</p>
  </div>

  {/* Revenue This Month */}
  <div className="rounded-lg p-4 shadow-sm bg-[#10B981] text-white">
    <h3 className="text-sm">Revenue This Month</h3>
    <p className="text-2xl font-bold">${Number(stats.monthly_revenue).toFixed(2)}</p>
  </div>

  {/* Delivered This Month */}
  <div className="rounded-lg p-4 shadow-sm bg-[#22C55E] text-white">
    <h3 className="text-sm">Delivered This Month</h3>
    <p className="text-2xl font-bold">{stats.monthly_delivered}</p>
  </div>

  {/* Pending This Month */}
  <div className="rounded-lg p-4 shadow-sm bg-[#FBBF24] text-white">
    <h3 className="text-sm">Pending This Month</h3>
    <p className="text-2xl font-bold">{stats.monthly_pending}</p>
  </div>

</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">

  {/* Shipped This Month */}
  <div className="rounded-lg p-4 shadow-sm bg-[#3B82F6] text-white">
    <h3 className="text-sm">Shipped This Month</h3>
    <p className="text-2xl font-bold">{stats.monthly_shipped}</p>
  </div>

  {/* Cancelled This Month */}
  <div className="rounded-lg p-4 shadow-sm bg-[#EF4444] text-white">
    <h3 className="text-sm">Cancelled This Month</h3>
    <p className="text-2xl font-bold">{stats.monthly_cancelled}</p>
  </div>

</div>

<h2 className="text-xl font-semibold text-gray-800 mt-10">Analytics Overview</h2>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 auto-rows-max">

  

 {/* Donut Chart Card */}
<div className="bg-white p-6 shadow-md rounded-xl flex flex-col items-center">

  {/* Toggle Buttons */}
  <div className="flex justify-center gap-4 mb-4">
    <button
      className={`px-4 py-2 rounded-lg ${viewMode === "overall" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
      onClick={() => setViewMode("overall")}
    >
      Overall
    </button>

    <button
      className={`px-4 py-2 rounded-lg ${viewMode === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
      onClick={() => setViewMode("monthly")}
    >
      This Month
    </button>
  </div>

  {/* Chart Wrapper */}
  <div className="flex justify-center items-center">
    <OrderStatusDonut
     title={viewMode === "overall" ? "Overall Order Status" : "This Month Order Status"}
     pending={viewMode === "overall" ? stats.pending : stats.monthly_pending}
     shipped={viewMode === "overall" ? stats.shipped : stats.monthly_shipped}
     delivered={viewMode === "overall" ? stats.delivered : stats.monthly_delivered}
     cancelled={viewMode === "overall" ? stats.cancelled : stats.monthly_cancelled}
    />
  </div>

</div>


  {/* Revenue Line Chart */}
  <div className="bg-white p-5 shadow-md rounded-xl">
  <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
    Monthly Revenue Trend
  </h2>

  <RevenueLineChart data={stats.revenue_trend} />
</div>

</div>


    </div>
    )
}

export default AdminOverview