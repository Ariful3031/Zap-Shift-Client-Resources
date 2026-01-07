import React from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";
// import Swal from 'sweetalert2';

export default function ApproveRiders() {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders`)
            console.log(riders)
            return res.data
        }
    })

    const updateRiderStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.email }
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        title: `Rider Status is set of ${status}. `,
                        showConfirmButton: false,
                        icon: "success",
                        timer: 2000
                    });
                }
            })

    }

    const handleApproval = (rider) => {
        updateRiderStatus(rider, 'approved')
    }

    const handleRejection = (rider) => {
        updateRiderStatus(rider, 'rejected')
    }

    return (
        <div>
            <h1 className='text-5xl'>Riders Pending Approval:{riders.length}</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>createAt</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, index) => <tr key={rider._id}>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>
                                    <p className={`${rider.status === 'approved' ? 'text-green-400' : 'text-red-500'}`}>  {rider.status}</p>


                                </td>
                                <td>{rider.createAt}</td>
                                <td>
                                    <button onClick={() => handleApproval(rider)} className="btn btn-primary text-black"> <FaUserCheck />Approve</button>
                                    <button onClick={() => handleRejection(rider)} className="btn bg-yellow-500 text-black mx-2"> <IoPersonRemoveSharp />Remove</button>
                                    <button className="btn bg-red-500 text-black"> <FaTrash/> Delete</button>
                                </td>
                              
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
