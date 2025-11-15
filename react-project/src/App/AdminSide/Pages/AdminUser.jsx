import React, { useContext, useEffect, useState,useMemo } from 'react'
import { AdminUserContest } from '../Contest/AdminUserContest'
import UserFilter from '../Components/UserFilter'
import UserDetailModal from '../Components/UserDetailsModal'

function AdminUser() {
    const {users,loadingUsers,errorUsers,fetchAllUsers,toggleBlockUser,toggleDeleteUser}=useContext(AdminUserContest)
    const[showDeleted,setShowDeleted]=useState(false)
    const[filteredUser,setFilteredUsers]=useState([])
    const [showModal,setShowModal]=useState(false)
    const[selectedUser,setSelectedUser]=useState(null)


    const openUserModal=(user)=>{
        setSelectedUser(user)
        setShowModal(true)
    }

    const closeUserModal=()=>{
        setSelectedUser(null)
        setShowModal(false)
    }

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
              <p className='text-gray-500 text-center py-6'>No user found</p>
          ) : (
              <div className='overflow-x-auto rounded-lg shadow-md border border-gray-200'>
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Username</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Created</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200'>
                {filteredUser.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 transition duration-150"
                  onClick={()=>openUserModal(u)}>
                    <td className="px-4 py-3 font-medium text-gray-900">{u.username}</td>
                    <td className="px-4 py-3 text-gray-700">{u.email}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(u.createdAt).toLocaleString()}
                    </td>

                    <td className="px-4 py-3 text-gray-700">
                      {/* BLOCK / UNBLOCK */}
                      <button
                        onClick={(e) =>{
                            e.stopPropagation()
                             toggleBlockUser(u.id)}}
                        className={`px-3 py-1 rounded-md text-sm font-medium border transition ${
                          u.isBlocked ? 'bg-green-100 border-green-300 text-green-700 hover:bg-green-200' : ' border-red-300 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        {u.isBlocked ? "Unblock" : "Block"}
                      </button>

                      {/* DELETE / RESTORE */}
                      <button
                        onClick={(e) => {
                            e.stopPropagation()
                            toggleDeleteUser(u.id)}}
                        className={`px-3 py-1 rounded-md text-sm font-medium border transition ${
                          u.isActive ? ' border-red-300 text-red-700 hover:bg-red-200' : 'bg-green-100 border-green-300 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {u.isActive ? "Delete" : "Restore"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <UserDetailModal isOpen={showModal} onClose={closeUserModal} user={selectedUser}/>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdminUser