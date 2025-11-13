import axios from 'axios'
import React, { createContext,  useState } from 'react'
import toast from 'react-hot-toast'


export const AdminContext=createContext()

export const AdminProvider=({children})=>{
    const[products,setProducts]=useState([])
    const[users,setUsers]=useState([])
    const[orders, setOrders]=useState([])
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState(null)

    const fetchAllProducts= async()=>{
        try{
            setLoading(true)
            const res=await axios.get("http://localhost:5000/products")
            setProducts(res.data)
            setError(null)
        }catch(err){
            console.error("Error fetching Products",err)
            setError("Failed to load the products")
            toast.error("Failed to load the products")
        }finally{
            setLoading(false)
        }
    }
   

    const addProducts= async(newProduct)=>{
        try{
            setLoading(true)
            const res=await axios.post("http://localhost:5000/products",newProduct)
            setProducts((prev)=>[...prev,res.data])
            toast.success("New Product added Successfully")
        }catch(err){
            console.error("Error adding new Product",err)
            toast.error("failed to add product")

        }finally{
            setLoading(false)
        }
    }
    const updateProducts= async(id,updateProduct)=>{
        try{
            setLoading(true)
            const res=await axios.put(`http://localhost:5000/products/${id}`,updateProduct)
            setProducts((prev)=>
            prev.map((product)=>(product.id===id? res.data:product))
        ); 
        toast.success("Product updated successfully")
        }catch(err){
            console.error("Error updating product")
            toast.error("Failed to update the product")
        }finally{
            setLoading(false)
        }

    }   
    const deleteProducts= async(id)=>{
        try{
            setLoading(true)
            const productToDelete=products.find((p)=>p.id===id);
            if(!productToDelete)return 

            const updateProduct={...productToDelete,isActive:false}
            const res=await axios.put(`http://localhost:5000/products/${id}`,updateProduct)
            setProducts((prev)=>prev.map((p)=>(p.id ===id ? updateProduct :p)))
            toast.success("Product deleted successfully")
        }catch(err){
            console.log("Error deleting product")
            toast.error("Failed to delete the product")
        }finally{
            setLoading(false)
        }

    }



    const restoreProduct = async (id) => {
  try {
    setLoading(true);
    const productToRestore = products.find((p) => p.id === id);
    if (!productToRestore) return;

    const updatedProduct = { ...productToRestore, isActive: true };

    await axios.put(`http://localhost:5000/products/${id}`, updatedProduct);

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? updatedProduct : p))
    );

    toast.success("Product restored successfully");
  } catch (err) {
    console.error("Error restoring product", err);
    toast.error("Failed to restore product");
  } finally {
    setLoading(false);
  }
};








    return(
        <AdminContext.Provider  value={{
        products,
        users,
        orders,
        loading,
        error,
        fetchAllProducts,
        addProducts,updateProducts,deleteProducts,restoreProduct
        }}>
            {children}

        </AdminContext.Provider>
    )
}
