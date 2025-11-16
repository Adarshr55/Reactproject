import axios from 'axios'
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import OrderStatusDonut from '../Components/OrderStatusDonut'
import RevenueLineChart from '../Components/RevenueLineChart'

function AdminOverview() {
    const[loading ,setLoading]=useState(true)
    const[error,setError]=useState(null)
    const[totalUsers,setTotalUsers]=useState(0)
    const[totalProducts,setTotalProducts]=useState(0)
    const[totalOrders,setTotalOrders]=useState(0)
    const[totalRevenue,setTotalRevenue]=useState(0)
    const [pendingCount, setPendingCount] = useState(0);
    const [shippedCount, setShippedCount] = useState(0);
    const [deliveredCount, setDeliveredCount] = useState(0);
    const [cancelledCount, setCancelledCount] = useState(0)
    const [monthlyOrders, setMonthlyOrders] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);
    const [monthlyDelivered, setMonthlyDelivered] = useState(0);
    const [monthlyPending, setMonthlyPending] = useState(0);
    const [monthlyShipped, setMonthlyShipped] = useState(0);
     const [monthlyCancelled, setMonthlyCancelled] = useState(0);
     const[revenueTrend,setRevenueTrend]=useState([])


    useEffect(()=>{
        const fetchOverviewData=async()=>{
            try{
                setLoading(true)
                const[usersRes,productsRes,ordersRes]=await Promise.all([
                    axios.get("http://localhost:5000/users"),
                    axios.get("http://localhost:5000/products"),
                    axios.get("http://localhost:5000/orders")
                ])

                const users=usersRes.data
                const products=productsRes.data
                const orders=ordersRes.data

                 setTotalUsers(users.length);
                 setTotalProducts(products.length);
                 setTotalOrders(orders.length);

                 const revenue = orders
                .filter((o) => o.status === "delivered")
                .reduce((sum, o) => sum + o.total, 0);
                setTotalRevenue(revenue);
                setPendingCount(orders.filter((o) => o.status === "pending").length);
                setShippedCount(orders.filter((o) => o.status === "shipped").length);
                setDeliveredCount(orders.filter((o) => o.status === "delivered").length);
                setCancelledCount(orders.filter((o) => o.status === "cancelled").length);
                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();

           const thisMonthOrders = orders.filter((o) => {
           const d = new Date(o.createdAt);
           return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
           });

// monthly count
       setMonthlyOrders(thisMonthOrders.length);

// monthly revenue (delivered only)
       const monthRev = thisMonthOrders
      .filter((o) => o.status === "delivered")
      .reduce((sum, o) => sum + o.total, 0);

       setMonthlyRevenue(monthRev);
// monthly statuses
    setMonthlyDelivered(thisMonthOrders.filter((o) => o.status === "delivered").length);
    setMonthlyPending(thisMonthOrders.filter((o) => o.status === "pending").length);
    setMonthlyShipped(thisMonthOrders.filter((o) => o.status === "shipped").length);
    setMonthlyCancelled(thisMonthOrders.filter((o) => o.status === "cancelled").length);
    // ---- Monthly Revenue Trend for All 12 Months 
const monthlyRevenueData = Array(12).fill(0); 

orders.forEach((order) => {
  const d = new Date(order.createdAt);
  const month = d.getMonth(); // 0-11

  if (order.status === "delivered") {
    monthlyRevenueData[month] += order.total;
  }
});

setRevenueTrend(monthlyRevenueData);           
     }catch(err){
      console.log("overview fetch error:",err)
        setError("failed to load dashbord info")
        }finally{
          setLoading(false)
        }
        }
        fetchOverviewData()
    },[])
   
  if (loading)
    return <p className="p-6 text-gray-600">Loading dashboard...</p>;

  if (error)
    return <p className="p-6 text-red-500">{error}</p>;


  
  const stats = [
    { title: "Total Products", value: totalProducts, icon: <Package className="w-6 h-6 text-yellow-600" /> },
    { title: "Total Users", value: totalUsers, icon: <Users className="w-6 h-6 text-yellow-600" /> },
    { title: "Total Orders", value: totalOrders, icon: <ShoppingCart className="w-6 h-6 text-yellow-600" /> },
    { title: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: <DollarSign className="w-6 h-6 text-yellow-600" /> },
  ];
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  
  {/* Total Products */}
  <div className="rounded-lg p-5 shadow-sm text-white bg-[#3B82F6] flex justify-between items-center">
    <div>
      <h4 className="text-sm opacity-90">Total Products</h4>
      <p className="text-2xl font-bold">{totalProducts}</p>
    </div>
    <div className="p-2 bg-white/20 rounded-full">
      <Package className="w-6 h-6" />
    </div>
  </div>

  {/* Total Users */}
  <div className="rounded-lg p-5 shadow-sm text-white bg-[#22C55E] flex justify-between items-center">
    <div>
      <h4 className="text-sm opacity-90">Total Users</h4>
      <p className="text-2xl font-bold">{totalUsers}</p>
    </div>
    <div className="p-2 bg-white/20 rounded-full">
      <Users className="w-6 h-6" />
    </div>
  </div>

  {/* Total Orders */}
  <div className="rounded-lg p-5 shadow-sm text-white bg-[#F59E0B] flex justify-between items-center">
    <div>
      <h4 className="text-sm opacity-90">Total Orders</h4>
      <p className="text-2xl font-bold">{totalOrders}</p>
    </div>
    <div className="p-2 bg-white/20 rounded-full">
      <ShoppingCart className="w-6 h-6" />
    </div>
  </div>

  {/* Total Revenue */}
  <div className="rounded-lg p-5 shadow-sm text-white bg-[#8B5CF6] flex justify-between items-center">
    <div>
      <h4 className="text-sm opacity-90">Total Revenue</h4>
      <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
    </div>
    <div className="p-2 bg-white/20 rounded-full">
      <DollarSign className="w-6 h-6" />
    </div>
  </div>

</div>

      <h2 className="text-xl font-semibold text-gray-800 mt-8">
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

</div>


  {/* Monthly Summary */}
<h2 className="text-xl font-semibold text-gray-800 mt-10">This Month Overview</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">

  {/* Orders This Month */}
  <div className="rounded-lg p-4 shadow-sm bg-[#8B5CF6] text-white">
    <h3 className="text-sm">Orders This Month</h3>
    <p className="text-2xl font-bold">{monthlyOrders}</p>
  </div>

  {/* Revenue This Month */}
  <div className="rounded-lg p-4 shadow-sm bg-[#10B981] text-white">
    <h3 className="text-sm">Revenue This Month</h3>
    <p className="text-2xl font-bold">${monthlyRevenue.toFixed(2)}</p>
  </div>

  {/* Delivered This Month */}
  <div className="rounded-lg p-4 shadow-sm bg-[#22C55E] text-white">
    <h3 className="text-sm">Delivered This Month</h3>
    <p className="text-2xl font-bold">{monthlyDelivered}</p>
  </div>

  {/* Pending This Month */}
  <div className="rounded-lg p-4 shadow-sm bg-[#FBBF24] text-white">
    <h3 className="text-sm">Pending This Month</h3>
    <p className="text-2xl font-bold">{monthlyPending}</p>
  </div>

</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">

  {/* Shipped This Month */}
  <div className="rounded-lg p-4 shadow-sm bg-[#3B82F6] text-white">
    <h3 className="text-sm">Shipped This Month</h3>
    <p className="text-2xl font-bold">{monthlyShipped}</p>
  </div>

  {/* Cancelled This Month */}
  <div className="rounded-lg p-4 shadow-sm bg-[#EF4444] text-white">
    <h3 className="text-sm">Cancelled This Month</h3>
    <p className="text-2xl font-bold">{monthlyCancelled}</p>
  </div>

</div>

<h2 className="text-xl font-semibold text-gray-800 mt-10">Analytics Overview</h2>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">

  {/* Donut Chart */}
  <div className="flex justify-center bg-white p-4 shadow-md rounded-xl">
    <OrderStatusDonut
      pending={pendingCount}
      shipped={shippedCount}
      delivered={deliveredCount}
      cancelled={cancelledCount}
    />
  </div>

  {/* Revenue Line Chart */}
  <div className="bg-white p-5 shadow-md rounded-xl">
  <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
    Monthly Revenue Trend
  </h2>

  <RevenueLineChart data={revenueTrend} />
</div>

</div>


    </div>
    )
}

export default AdminOverview