import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react'
import { useParams } from 'react-router'
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

export default function Payment() {
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })
    // const handlepayment = async (parcel) => {
    //     const paymentInfo = {
    //         cost: parcel.cost,
    //         parcelId: parcel._id,
    //         senderEmail: parcel.senderEmail,
    //         parcelName: parcel.parcelName
    //     }
    //     const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
    //     console.log(res.data)
    //     window.location.href= res.data.url
    // }

    if (isLoading) {
        return <div>
            <span className="loading loading-infinity loading-xs"></span>
            <span className="loading loading-infinity loading-sm"></span>
            <span className="loading loading-infinity loading-md"></span>
            <span className="loading loading-infinity loading-lg"></span>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }
    return (
        <div>
            <h1> please pay {parcel.cost} for :{parcel.parcelName}</h1>
            <button onClick={handlepayment} className='btn btn-primary text-black'>pay</button>
        </div>

    )
}
