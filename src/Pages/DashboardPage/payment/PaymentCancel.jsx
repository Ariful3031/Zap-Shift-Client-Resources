import React from 'react'
import { Link } from 'react-router'

export default function PaymentCancel() {
  return (
    <div>
        <h1>your Payment Cancel, please try again</h1>
        <Link to='/dashboard/my-parcels'>
        <button className='btn btn-primary text-black'>Try again</button>
        </Link>
    </div>
  )
}
