import React from "react";
import toast from "react-hot-toast";

export const confirmToast = (message, onConfirm) => {
  toast.custom(
    (t) => (
      <div className="bg-white px-4 py-3 rounded-lg shadow-lg border text-sm w-64">
        <p className="text-gray-800">{message}</p>

        <div className="flex justify-end gap-2 mt-3">
          <button
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>

          <button
            className="px-3 py-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition"
            onClick={() => {
              console.log("Confirm BUTTON clicked");   
              toast.dismiss(t.id);
              onConfirm();                           
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    ),
    {
      duration: 5000,
      position: "top-center",
    }
  );
};
