import axios from 'axios';
import React, { createContext, useState } from 'react';
import toast from 'react-hot-toast';

export const AdminUserContest = createContext();

export const AdminUserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState(null);

  //  Fetch all users except admins
  const fetchAllUsers = async () => {
    try {
      setLoadingUsers(true);

      const res = await axios.get("http://localhost:5000/users");

      const cleanUsers = res.data.map(u => ({
        ...u,
        isActive: u.isActive ?? true,
        isBlocked: u.isBlocked ?? false,
      }));

      const nonAdmins = cleanUsers.filter((u) => u.role !== "admin");

      setUsers(nonAdmins);
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
      const user = users.find((u) => u.id === id);
      if (!user) return;

      const updated = { ...user, isBlocked: !user.isBlocked };

      await axios.put(`http://localhost:5000/users/${id}`, updated);

      setUsers((prev) =>
        prev.map((u) => (u.id === id ? updated : u))
      );

      toast.success(updated.isBlocked ? "User Blocked" : "User Unblocked");
    } catch (err) {
      console.error("Error toggling block", err);
      toast.error("Block operation failed");
    }
  };

  // Toggle delete/restore
  const toggleDeleteUser = async (id) => {
    try {
      const user = users.find((u) => u.id === id);
      if (!user) return;


      if(!user.isActive){
        const conflict=users.find(
            (u)=>
                u.id !== id &&
                u.isActive===true &&
                (u.email===user.email ||u.username === user.username)
        )
        if(conflict){
            toast.error("Cannot restore this user.Another Active account exists with same email or username ")
            return
        }
      }

      const updated = { ...user, isActive: !user.isActive };

      await axios.put(`http://localhost:5000/users/${id}`, updated);

      setUsers((prev) =>
        prev.map((u) => (u.id === id ? updated : u))
      );

      toast.success(updated.isActive ? "User Restored" : "User Deleted");
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
