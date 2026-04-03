import axios from 'axios';
import React, { createContext, useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../../services/api' 

export const AdminUserContest = createContext();

export const AdminUserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState(null);

  //  Fetch all users except admins
  const fetchAllUsers = async () => {
    try {
      setLoadingUsers(true);

      const res = await API.get('/admin/users/')
      setUsers(res.data.results);
      setErrorUsers(null);
    } catch (err) {
      console.error("Error fetching users", err);
      setErrorUsers("Failed to load users");
      toast.error("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };

  //  Toggle block/unblock
  const toggleBlockUser = async (id) => {
    try {
      const res=await API.patch(`/admin/users/${id}/block/`)
       setUsers(prev =>
                prev.map(u => u.id === id ? res.data : u) 
            )
      toast.success(res.data.is_blocked ? "User Blocked" : "User Unblocked")
    } catch (err) {
      console.error("Error toggling block", err);
      toast.error("Block operation failed");
    }
  };

  // Toggle delete/restore
  const toggleDeleteUser = async (id) => {
    try {
      const res=await API.patch(`/admin/users/${id}/toggle/`)
        setUsers(prev => prev.map(u => u.id === id ? res.data : u))
     toast.success(res.data.is_active ? "User Restored" : "User Deleted")
    } catch (err) {
      console.error("Error toggling delete", err);
      toast.error("Delete operation failed");
    }
  };

  //  Update user
  const updateUser = async (id, updatedData) => {
    try {
      const res = await axios.put(`http://localhost:5000/users/${id}`, updatedData);

      setUsers((prev) =>
        prev.map((u) => (u.id === id ? res.data : u))
      );

      toast.success("User updated");
    } catch (err) { 
      console.error("Error updating user", err);
      toast.error("Failed to update user");
    }
  };

  return (
    <AdminUserContest.Provider
      value={{
        users,
        loadingUsers,
        errorUsers,
        fetchAllUsers,
        toggleBlockUser,
        toggleDeleteUser,
        updateUser,
      }}
    >
      {children}
    </AdminUserContest.Provider>
  );
};
