import React from "react";
import { X } from "lucide-react";

function UserDetailModal({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg relative p-6">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          User Details
        </h2>

        {/* User  */}
        <div className="space-y-3 text-sm text-gray-700">

          <div>
            <p className="text-xs font-semibold text-gray-500">Username</p>
            <p className="border p-2 rounded-md mt-1 bg-gray-50">{user.username}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500">Email</p>
            <p className="border p-2 rounded-md mt-1 bg-gray-50">{user.email}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500">Created At</p>
            <p className="border p-2 rounded-md mt-1 bg-gray-50">
              {new Date(user.createdAt).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500">Status</p>
            <p className={`border p-2 rounded-md mt-1 font-medium ${
              user.isActive ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"
            }`}>
              {user.isActive ? "Active" : "Deleted"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500">Block Status</p>
            <p className={`border p-2 rounded-md mt-1 font-medium ${
              user.isBlocked ? "text-red-700 bg-red-50" : "text-green-700 bg-green-50"
            }`}>
              {user.isBlocked ? "Blocked" : "Not Blocked"}
            </p>
          </div>

        </div>

        {/* Close */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetailModal;
