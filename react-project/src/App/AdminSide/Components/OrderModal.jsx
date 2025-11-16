
import { X } from 'lucide-react'
import React from 'react'

function OrderModal({ isOpen, onClose, order }) {
    if (!isOpen || !order) return null;

    const statusColor = {
        pending: "bg-yellow-100 text-yellow-700",
        shipped: "bg-blue-100 text-blue-700",
        delivered: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700"
    };

    return (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
            <div className="bg-white w-[95%] md:w-[60%] lg:w-[45%] rounded-xl shadow-2xl p-6 relative animate-scaleIn">

                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Order Details — <span className="text-gray-600">#{order.id}</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:bg-gray-100 transition"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/*  INFO */}
                <div className="mb-4 text-sm space-y-1">
                    <p><span className="font-semibold text-gray-700">User:</span> {order.username}</p>

                    <p>
                        <span className="font-semibold text-gray-700">Date:</span>{" "}
                        {new Date(order.createdAt).toLocaleString()}
                    </p>

                    <p className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">Status:</span>
                        <span className={`px-2 py-[3px] rounded text-xs font-medium ${statusColor[order.status]}`}>
                            {order.status}
                        </span>
                    </p>
                </div>

                {/* ITEMS */}
                <h3 className="font-semibold text-gray-800 mb-2">Items</h3>

                <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                    {order.items.map((item) => (
                        <div
                            key={item.productId}
                            className="flex items-center gap-3 border rounded-lg p-2 hover:bg-gray-50 transition"
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.name}
                                className="w-12 h-12 rounded object-cover border"
                            />

                            <div className="flex-1">
                                <p className="font-medium text-gray-800">{item.name}</p>
                                <p className="text-xs text-gray-500">
                                    Qty: {item.quantity} × ${item.price}
                                </p>
                            </div>

                            <p className="font-semibold text-gray-700">
                                ${(item.quantity * item.price).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* ADDRESS */}
                <h3 className="font-semibold text-gray-800 mt-5 mb-2">Shipping Address</h3>

                <div className="text-sm space-y-1 text-gray-700">
                    <p><span className="font-semibold">Name:</span> {order.address.fullname}</p>
                    <p><span className="font-semibold">Address:</span> {order.address.address}</p>
                    <p><span className="font-semibold">City:</span> {order.address.city}</p>
                    <p><span className="font-semibold">Phone:</span> {order.address.phone}</p>
                    <p><span className="font-semibold">Payment:</span> {order.address.payment}</p>
                </div>

                {/* TOTAL */}
                <div className="mt-5 pt-3 border-t flex justify-between text-lg font-semibold text-gray-800">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                </div>

                {/* CLOSE BUTTON */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 shadow-sm transition font-medium"
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    )
}

export default OrderModal



