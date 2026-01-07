import React from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from "react-icons/fi";
import Swal from 'sweetalert2';


export default function UsersManagement() {
    const axiosSecure = useAxiosSecure();

    const { data: users = [],
        refetch
     } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data
        }
    })
    // console.log(users)

const handleMakeUser=(user)=>{
    const roleInfo ={role: 'admin'}
    axiosSecure.patch(`/users/${user._id}`,roleInfo)
    .then(res=>{
        console.log(res.data)
        if(res.data.modifiedCount){
             refetch();
                    Swal.fire({
                        title: `${user.displayName} Marked as Admin`,
                        showConfirmButton: false,
                        icon: "success",
                        timer: 2000
                    });
        }
    })
}
const handleRemoveAdmin=(user)=>{
    const roleInfo ={role: 'user'}
    axiosSecure.patch(`/users/${user._id}`,roleInfo)
    .then(res=>{
        console.log(res.data)
        if(res.data.modifiedCount){
             refetch();
                    Swal.fire({
                        title: `${user.displayName} removed from Admin`,
                        showConfirmButton: false,
                        icon: "success",
                        timer: 2000
                    });
        }
    })
}
    return (
        <div>
            <h1>Manage users: {users.length}</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                SL. NO.
                            </th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <tr>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photoURL}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.displayName}</div>
                                        {/* <div className="text-sm opacity-50">{user.email}</div> */}
                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.role}
                            </td>
                            <td>
                                {user.role === 'admin' ?
                                    <button onClick={()=>handleRemoveAdmin(user)} className='btn bg-red-500 '> <FiShieldOff /></button> :
                                    <button onClick={()=>handleMakeUser(user)} className='btn bg-green-500 '> <FaUserShield /></button>}
                            </td>
                            <td>
                                Actions
                            </td>
                        </tr>)}


                    </tbody>

                </table>
            </div>


        </div>
    )
}
