import React from 'react'
import useAuth from '../../../Hooks/UseAuth'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

export default function PaymentHistory() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            console.log(payments)
            return res.data
        }

    })
    return (
        <div>
            <h1 className='text-5xl'> Payment Histroy : {payments.length} </h1>
        

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL.</th>
                            <th>Parcel Info</th>
                            <th>Amount</th>
                            <th>Paid Time</th>
                            <th>Transaction Id</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment.parcelName}</td>
                                <td>${payment.amount}</td>
                                <td>{payment.paidAt}</td>
                                <td>{payment.transactionId}</td>
                                <td>
                                    <button className="btn btn-primary text-black">View</button>
                                </td>
                                {/* {console.log(payment)} */}
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
