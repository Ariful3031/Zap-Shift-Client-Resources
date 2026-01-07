import React from 'react'
import bookingImg from '../../assets/bookingIcon.png'

export default function HowWork() {
  return (
    <div className='mx-15 my-20'> 
        <h1 className='text-3xl dark:text-black font-bold'>How it Works</h1>
        <div className='grid grid-cols-4 gap-5 mt-5'>
            <div className='bg-white p-5 rounded-xl'>
                <img src={bookingImg} alt="" />
                <h2 className='text-xl dark:text-black font-bold my-3'>Booking Pick & Drop</h2>
                <p className='text-[#606060]'>From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className='bg-white p-5 rounded-xl'>
                <img src={bookingImg} alt="" />
                <h2 className='text-xl dark:text-black font-bold my-3'>Cash On Delivery</h2>
                <p className='text-[#606060]'>From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className='bg-white p-5 rounded-xl'>
                <img src={bookingImg} alt="" />
                <h2 className='text-xl dark:text-black font-bold my-3'>Delivery Hub</h2>
                <p className='text-[#606060]'>From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className='bg-white p-5 rounded-xl'>
                <img src={bookingImg} alt="" />
                <h2 className='text-xl dark:text-black font-bold my-3'>Booking SME & Corporate</h2>
                <p className='text-[#606060]'>From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
        </div>
    </div>
  )
}
