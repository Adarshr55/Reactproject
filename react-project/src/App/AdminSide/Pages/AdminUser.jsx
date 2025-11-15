import React, { useContext, useEffect, useState,useMemo } from 'react'
import { AdminUserContest } from '../Contest/AdminUserContest'
import UserFilter from '../Components/UserFilter'

function AdminUser() {
    const {users,loadingUsers,errorUsers,fetchAllUsers,toggleBlockUser,toggleDeleteUser}=useContext(AdminUserContest)
    const[showDeleted,setShowDeleted]=useState(false)
    const[filteredUser,setFilteredUsers]=useState([])

    useEffect(()=>{
        fetchAllUsers()
    },[])
  
    // if (loadingUsers)return <p className='text-gray-600'>loading....</p>
    // if(errorUsers)return <p className='text-red-500'>{errorUsers}</p>
    // console.log(users)

      const visibleUser = useMemo(() => {
    return showDeleted ? users.filter(u => !u.isActive) : users.filter(u => u.isActive)
  }, [users, showDeleted])

    useEffect(()=>{
        setFilteredUsers(visibleUser)
    },[visibleUser])

  return (
    <div className='p-4'>
       {loadingUsers && <p className='text-gray-600'>loading....</p>}
      {errorUsers && <p className='text-red-500'>{errorUsers}</p>}
       {!loadingUsers && !errorUsers && (
        <>
          {/* HEADER / ACTIVE + DELETED TOGGLE */}
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold mb-4">
              {showDeleted ? "Deleted Users" : "Active Users"}
            </h2>

            <button
              onClick={() => setShowDeleted(prev => !prev)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              {showDeleted ? "Show Active Users" : "Show Deleted Users"}
            </button>
          </div>

          {/* FILTER COMPONENT */}
          <UserFilter users={visibleUser} onFilterChange={setFilteredUsers} />

          {/* TABLE */}
          {filteredUser.length === 0 ? (
            <p>No user found</p>
          ) : (
            <table className="w-full border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2">Username</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Created</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUser.map(u => (
                  <tr key={u.id} className="border-t">
                    <td className="px-3 py-2">{u.username}</td>
                    <td className="px-3 py-2">{u.email}</td>
                    <td className="px-3 py-2">
                      {new Date(u.createdAt).toLocaleString()}
                    </td>

                    <td className="px-3 py-2">
                      {/* BLOCK / UNBLOCK */}
                      <button
                        onClick={() => toggleBlockUser(u.id)}
                        className={`px-3 py-1 mr-2 rounded ${
                          u.isBlocked ? 'bg-green-100' : 'bg-red-100'
                        }`}
                      >
                        {u.isBlocked ? "Unblock" : "Block"}
                      </button>

                      {/* DELETE / RESTORE */}
                      <button
                        onClick={() => toggleDeleteUser(u.id)}
                        className={`px-3 py-1 rounded ${
                          u.isActive ? 'bg-red-100' : 'bg-green-100'
                        }`}
                      >
                        {u.isActive ? "Delete" : "Restore"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  )
}

export default AdminUser