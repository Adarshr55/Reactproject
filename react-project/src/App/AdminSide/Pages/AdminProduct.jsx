import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../Contest/AdminContest";
import { Edit, Trash2, RotateCcw } from "lucide-react";
import AdminModal from "../Components/AdminModal";
import toast from "react-hot-toast";
import ProductFilter from "../Components/ProductFilter";
import { confirmToast } from "../Components/Utilites/ConfirmToast";

function AdminProduct() {
  const {
    products,
    loading,
    error,
    fetchAllProducts,
    deleteProducts,
    restoreProduct,
    updateProducts,
    addProducts
  } = useContext(AdminContext);

  const [showDeleted, setShowDeleted] = useState(false);
  const [isModalOpen,setisModalOpen]=useState(false)
  const [selectedProduct,setSelectedProduct]=useState(null)
  const [editedProduct,setEditedProduct]=useState(null)
  const [saving,setSaving]=useState(false)
  const[errors, setErrors]=useState({})
//   const[search,setSearch]=useState("")
//   const[categoryFilter,setCategoryFilter]=useState("All")
const[filteredList,setFilteredList]=useState([])
const[currentPage,setCurrentPage]=useState(1)
const itemsPerpage=8


 const filteredProducts = showDeleted
    ? products.filter((p) => !p.isActive)
    : products.filter((p) => p.isActive);

  useEffect(() => {
    fetchAllProducts();
  }, []);


  useEffect(() => {
  const list = showDeleted
    ? products.filter(p => !p.isActive)
    : products.filter(p => p.isActive);

  setFilteredList(list);
}, [products, showDeleted]);


  useEffect(()=>{
    if(selectedProduct){
        setEditedProduct({...selectedProduct})
    }
  },[selectedProduct])

 

  const handleDelete = (id) => {
   confirmToast("Are you sure you wanted to delete the product?",()=>{
    console.log("confimtoast callback runnig for id",id)
    deleteProducts(id)
   })
  };

  const handleRestore = (id) => {
    confirmToast("Restore this Product",()=>{
        restoreProduct(id);
    }) 
  };
   
  const validateForm=()=>{
    const newErrors={}
    if(!editedProduct.name?.trim())newErrors.name="Product name required"
    if(!editedProduct.brand?.trim())newErrors.brand="Brand is required"
    if(!editedProduct.category?.trim())newErrors.category="category is required"
    if(!editedProduct.price ||editedProduct.price<=0)newErrors.price="Price must be greater than 0"
    setErrors(newErrors)
    return Object.keys(newErrors).length===0
  }


  const handleSave= async()=>{
    if(!validateForm())return
       setSaving(true)
  
    try {
        if(selectedProduct){
         await updateProducts(editedProduct.id,editedProduct)
          toast.success("Product edited Successfully")
        }else{
          await addProducts({...editedProduct,isActive:true})
          toast.success("product is added successfully")
        }
        fetchAllProducts()
        setisModalOpen(false)
        setSelectedProduct(null)
        setEditedProduct(null)
    }catch(err){
        console.error("error updateing the product",err)
        toast.error("failed to update the product")

    }finally{
        setSaving(false)

    }
 }

 const indexOfLastItem=currentPage *itemsPerpage
 const indexOfFirstItem=indexOfLastItem -itemsPerpage
 const currentProducts = filteredList.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(filteredList.length / itemsPerpage);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full overflow-hidden">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          {showDeleted ? "Deleted Products" : "Active Products"}
        </h1>

        <div className="flex gap-2">

            <button onClick={()=>{
                setSelectedProduct(null)
                setEditedProduct({name:"",brand:"",category:"" ,description:"",rating:"",price:"",stock:"", thumbnail:"",isActive:""})
                setisModalOpen(true)

            }}  
             className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-sm">
                Add Product 
            </button>

        <button
          onClick={() => setShowDeleted(!showDeleted)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
        >
          {showDeleted ? "Show Active Products" : "Show Deleted Products"}
        </button>
      </div>
      </div>

      <ProductFilter
         products={showDeleted ?products.filter(p=>!p.isActive):products.filter(p=>p.isActive)}
         onFilterchange={setFilteredList}/>

    
      {loading && <p className="text-gray-500">Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

    
      {!loading && filteredList.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          {showDeleted
            ? "No deleted products found."
            : "No active products available."}
        </p>
      )}

    
      {!loading && filteredList.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Image</th>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Brand</th>
                <th className="px-4 py-3 text-left font-semibold">Category</th>
                <th className="px-4 py-3 text-center font-semibold">Price</th>
                <th className="px-4 py-3 text-center font-semibold">Stock</th>
                <th className="px-4 py-3 text-center font-semibold">Rating</th>
                <th className="px-4 py-3 text-center font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {currentProducts.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3">
                    <img
                      src={p.thumbnail}
                      alt={p.name}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {p.name}
                  </td>
                  <td className="px-4 py-3">{p.brand}</td>
                  <td className="px-4 py-3 capitalize">{p.category}</td>
                  <td className="px-4 py-3 text-center">${p.price}</td>
                  <td className="px-4 py-3 text-center">{p.stock}</td>
                  <td className="px-4 py-3 text-center">{p.rating}</td>


                  <td className="px-4 py-3 flex justify-center gap-2">
                    {!showDeleted ? (
                      <>
                        <button onClick={()=>{
                            setSelectedProduct(p)
                            setEditedProduct({...p})
                            setisModalOpen(true)
                        }}
                            className="flex items-center gap-1 px-3 py-1 border border-blue-300 text-blue-600 rounded-md hover:bg-blue-50 transition">
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="flex items-center gap-1 px-3 py-1 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleRestore(p.id)}
                        className="flex items-center gap-1 px-3 py-1 border border-green-300 text-green-600 rounded-md hover:bg-green-50 transition"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Restore
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Pagination Controls */}
{totalPages > 1 && (
  <div className="flex justify-center items-center gap-2 mt-4">

    {/* Prev Button */}
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(prev => prev - 1)}
      className={`px-3 py-1 rounded-md border ${
        currentPage === 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      Prev
    </button>

    {/* Page Numbers */}
    {[...Array(totalPages).keys()].map((number) => (
      <button
        key={number}
        onClick={() => setCurrentPage(number + 1)}
        className={`px-3 py-1 rounded-md border ${
          currentPage === number + 1
            ? "bg-yellow-500 text-white"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        {number + 1}
      </button>
    ))}

    {/* Next Button */}
    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(prev => prev + 1)}
      className={`px-3 py-1 rounded-md border ${
        currentPage === totalPages
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      Next
    </button>

  </div>
)}
      <AdminModal isOpen={isModalOpen}
      onClose={()=> { 
        setSelectedProduct(null)
        setEditedProduct(null)
        setisModalOpen(false)

    }}
      title= {selectedProduct ? "Edit product ": "  Add New Product"}>
          {editedProduct ? (
            <div className="space-y-3 text-sm">
                <div className="flex flex-col items-center gap-2">
                    <img
                      src={editedProduct.thumbnail ||"/images/no-images.png"}
                      alt={editedProduct.name} 
                      className="w-28 h-28 object-cover rounded-md border"
                      onError={(e)=>{
                           if (!e.target.dataset.fallback) {
                            e.target.dataset.fallback = "true";   
                         e.target.src = "/images/no-image.png";       
                         }

                      }
                        
                    }/>
                    <label className="block text-xs font-medium text-gray-700">
                        Change Image(URL)
                    </label>
                    <input
                     type="text"
                     value={editedProduct.thumbnail}
                     onChange={(e)=>
                        setEditedProduct({...editedProduct,thumbnail:e.target.value})
                     }
                     className="w-full border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-1   focus:ring-yellow-400"/>   
                </div>

                 {[
              { label: "Product Name", key: "name" },
              { label: "Brand", key: "brand" },
              { label: "Category", key: "category" },
              { label: "Price ($)", key: "price", type: "number" },
              { label: "Stock", key: "stock", type: "number" },
              { label: "Rating (0–5)", key: "rating", type: "number" }
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-700">
                  {label}
                </label>
                <input
                  type={type || "text"}
                  value={editedProduct[key]}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      [key]: e.target.value,
                    })
                  }
                  className={`w-full border rounded-md px-2 py-[3px] text-sm focus:outline-none focus:ring-1 ${
                    errors[key]
                      ? "border-red-400 focus:ring-red-400"
                      : "border-gray-300 focus:ring-yellow-400"
                  }`}
                />
                {errors[key] && (
                  <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-xs font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={editedProduct.description}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    description: e.target.value,
                  })
                }
                rows={3}
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400 resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setisModalOpen(false)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`px-3 py-1.5 text-sm rounded-md text-white transition ${
                  saving
                    ? "bg-yellow-300 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                {saving ? "Saving..." : selectedProduct ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No product selected</p>
        )}
      </AdminModal>
    </div>
  );
}

export default AdminProduct;
