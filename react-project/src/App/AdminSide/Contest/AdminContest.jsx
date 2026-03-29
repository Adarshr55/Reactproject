import axios from 'axios'
import React, { createContext,  useState } from 'react'
import toast from 'react-hot-toast'
import API from '../../../services/api'

export const AdminContext=createContext()

export const AdminProvider=({children})=>{
    const[products,setProducts]=useState([])
    const[users,setUsers]=useState([])
    const[orders, setOrders]=useState([])
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState(null)

      const mapProduct = (p) => ({
    ...p,
    isActive: p.is_active,               
    createdAt: p.created_at,
    category: p.category,            
  })

    const fetchAllProducts= async()=>{
        try{
            setLoading(true)
            const res=await API .get('/admin/products/')
            setProducts(res.data.map(mapProduct))
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
             const formData = new FormData()
            formData.append('name', newProduct.name)
            formData.append('brand', newProduct.brand)
            formData.append('category', newProduct.category?.name || newProduct.category)
            formData.append('description', newProduct.description || '')
            formData.append('price', newProduct.price)
            formData.append('stock', newProduct.stock)
            formData.append('rating', newProduct.rating)
            if (newProduct.thumbnailFile) {
               formData.append('thumbnail', newProduct.thumbnailFile) 
             }
            const res = await API.post('/admin/products/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
            })

            setProducts((prev)=>[...prev,mapProduct(res.data)])
            toast.success("New Product added Successfully")
        }catch(err){
            console.error("Error adding new Product",err)
            toast.error("failed to add product")
            throw err

        }finally{
            setLoading(false)
        }
    }
    const updateProducts= async(id,updatedProduct)=>{
        try{
            setLoading(true)
             const formData = new FormData()
             formData.append('name', updatedProduct.name)
             formData.append('brand', updatedProduct.brand)
             formData.append('category', updatedProduct.category?.name || updatedProduct.category)
             formData.append('description', updatedProduct.description || '')
             formData.append('price', updatedProduct.price)
             formData.append('stock', updatedProduct.stock)
             formData.append('rating', updatedProduct.rating)
             if (updatedProduct.thumbnailFile) {
               formData.append('thumbnail', updatedProduct.thumbnailFile) // ✅ only if new file picked
             }
               const res = await API.put(`/admin/products/${id}/`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
             })
            setProducts((prev)=>
            prev.map((p)=>(p.id===id? mapProduct(res.data) :p))
        ); 
        toast.success("Product updated successfully")
        }catch(err){
            console.error("Error updating product")
            toast.error("Failed to update the product")
            throw err
        }finally{
            setLoading(false)
        }

    }   
    const deleteProducts= async(id)=>{
        try{
            setLoading(true)
            const res=await API.patch(`/admin/products/${id}/`)
            setProducts((prev)=>prev.map((p)=>(p.id ===id ? mapProduct(res.data) :p)))
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
 
    const res=await API.patch(`/admin/products/${id}/`)

    setProducts((prev) =>
      prev.map((p) => (p.id === id ?  mapProduct(res.data): p))
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
