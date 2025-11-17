import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderModal from "../Components/OrderModal";
import OrderFilter from "../Components/OrderFilter";
import toast from "react-hot-toast";
import { confirmToast } from "../Components/Utilites/ConfirmToast";

const STATUSES = ["pending", "shipped", "delivered", "cancelled"];

function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredOrder, setFilteredOrder] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [currentPage,setCurrentPage]=useState(1)
  const itemsPerpage=5


  // Fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/orders");
      setOrders(res.data);
      setError(null);
    } catch (err) {
      console.error("Error Fetching Orders", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    setFilteredOrder(orders);
  }, [orders]);

  useEffect(()=>{
    setCurrentPage(1)
  },[filteredOrder])

  const indexOfLast=currentPage* itemsPerpage
  const indexOfFirst=indexOfLast- itemsPerpage
  const currentOrders=filteredOrder.slice(indexOfFirst,indexOfLast)
  const totalPages=Math.ceil(filteredOrder.length /itemsPerpage)

  const nextPage=()=>{
    if(currentPage<totalPages)setCurrentPage((p)=>p+1)
  }
  const prevPage=()=>{
    if(currentPage>1)setCurrentPage((p)=>p-1)
  }

  // Update Status with optimistic UI
  const updateOrderStatus = async (id, newStatus) => {
    if (updatingId === id) return;

    const prevOrders = [...orders];
    const prevFiltered = [...filteredOrder];

    const optimisticOrders = orders.map((o) =>
      o.id === id ? { ...o, status: newStatus } : o
    );
    const optimisticFiltered = filteredOrder.map((o) =>
      o.id === id ? { ...o, status: newStatus } : o
    );

    setOrders(optimisticOrders);
    setFilteredOrder(optimisticFiltered);
    setUpdatingId(id);

    try {
      await axios.patch(`http://localhost:5000/orders/${id}`, {
        status: newStatus,
      });
      toast.success("Order status updated");
    } catch (err) {
      console.error("Update failed", err);
      setOrders(prevOrders);
      setFilteredOrder(prevFiltered);
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete=(id)=>{
    confirmToast("Are you sure you wanted to delete this order",async()=>{
        try{
            const prevOrders=[...orders]
            const prevFiltered=[...filteredOrder]

            setOrders((o)=>o.filter((ord)=>ord.id !==id))
            setFilteredOrder((o)=>o.filter((ord)=>ord.id !==id))

            axios.delete(`http://localhost:5000/orders/${id}`)
            toast.success("order deleted successfully")
        }
        catch(err){
            console.error("order delete failed",err)
            toast.error("Failed to Delete order")
            setOrders(prevOrders)
            setFilteredOrder(prevFiltered)
            fetchOrders()

        }
    })

  }

  // Badge colors
  const statusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Order Management</h2>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <OrderFilter orders={orders} onFilterChange={setFilteredOrder} />

          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">Order Id</th>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody className="px-4 py-3 text-left">
                {currentOrders.map((o) => (
                  <tr
                    key={o.id}
                    className="hover:bg-gray-50 cursor-pointer transition"
                    onClick={() => {
                      setSelectedOrder(o);
                      setIsModalOpen(true);
                    }}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {o.id}
                    </td>

                    <td className="px-4 py-3">{o.username}</td>

                    <td className="px-4 py-3">${o.total.toFixed(2)}</td>

                    {/* STATUS BADGE ONLY */}
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${statusBadgeClass(
                          o.status
                        )}`}
                      >
                        {o.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      {new Date(o.createdAt).toLocaleString()}
                    </td>

                    {/* ACTION COLUMN */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {/* Status dropdown */}
                        <select
                          value={o.status}
                          onClick={(e) => e.stopPropagation()} // prevent modal opening
                          onChange={(e) =>
                            updateOrderStatus(o.id, e.target.value)
                          }
                          disabled={
                            updatingId === o.id||
                            o.status==="delivered"||
                            o.status==="cancelled"

                           }
                           className={`px-2 py-1 text-xs rounded-md border bg-white focus:ring-1 ${
                                           o.status === "delivered" || o.status === "cancelled"
                                         ? "opacity-50 cursor-not-allowed"
                                         : "cursor-pointer focus:ring-yellow-400"
                                        }`}
                            >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>

                        {/* Updating indicator */}
                        {updatingId === o.id && (
                          <span className="text-xs text-gray-500">
                            Updating...
                          </span>
                          
                        )}
                        <button onClick={(e)=>{
                            e.stopPropagation()
                            handleDelete(o.id)
                        } }
                        className="px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                            Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center gap-4 mt-5">
            <button
            onClick={prevPage}
            disabled={currentPage==1}
            className={`px-3 py-1 border rounded text-sm ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
                Previous
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
            onClick={nextPage}
            disabled={currentPage===totalPages}
            className={`px-3 py-1 border rounded text-sm ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
                Next   
            </button>
          </div>

          <OrderModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            order={selectedOrder}
          />
        </>
      )}
    </div>
  );
}

export default AdminOrder;
