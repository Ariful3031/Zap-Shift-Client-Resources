import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();
    console.log(sessionId)

    useEffect(() => {


        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    })
                })
        }
    }, [sessionId, axiosSecure])
    return (
        <div>
            <h1>your Payment Successful</h1>
            <p>Your transaction id: {paymentInfo.transactionId}</p>
            <p>your parcel tracking id: {paymentInfo.trackingId}</p>
        </div>
    )
}
