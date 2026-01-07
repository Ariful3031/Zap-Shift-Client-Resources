import React from 'react'
import serviceImg from '../../assets/service.png'

export default function OurService() {
    return (
        <div className='p-25 bg-secondary rounded-2xl'>
            <h1 className='text-3xl text-white text-center dark:text-black font-extrabold'>Our Services</h1>
            <p className='text-[#DADADA] my-3 text-center'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.</p>
            <div className='grid grid-cols-3 gap-5 my-10'>
                <div className='bg-white hover:bg-[#CAEB66] text-center px-10 py-15 rounded-xl'>
                    <div className='bg-gray-100 p-3 inline-block rounded-full'>
                        <img className='text-center' src={serviceImg} alt="" />
                    </div>
                    <h2 className='text-xl dark:text-black font-bold my-3'>Booking Pick & Drop</h2>
                    <p className='text-[#606060]'>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>

                <div className='bg-white hover:bg-[#CAEB66] text-center px-10 py-15 rounded-xl'>
                    <div className='bg-gray-100 p-3 inline-block rounded-full'>
                        <img className='text-center' src={serviceImg} alt="" />
                    </div>
                    <h2 className='text-xl dark:text-black font-bold my-3'>Nationwide Delivery</h2>
                    <p className='text-[#606060]'>We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.</p>
                </div>

                <div className='bg-white hover:bg-[#CAEB66] text-center px-10 py-15 rounded-xl'>
                    <div className='bg-gray-100 p-3 inline-block rounded-full'>
                        <img className='text-center' src={serviceImg} alt="" />
                    </div>
                    <h2 className='text-xl dark:text-black font-bold my-3'>Fulfillment Solution</h2>
                    <p className='text-[#606060]'>We also offer customized service with inventory management support, online order processing, packaging, and after sales support.</p>
                </div>

                <div className='bg-white hover:bg-[#CAEB66] text-center px-10 py-15 rounded-xl'>
                    <div className='bg-gray-100 p-3 inline-block rounded-full'>
                        <img className='text-center' src={serviceImg} alt="" />
                    </div>
                    <h2 className='text-xl dark:text-black font-bold my-3'>Cash on Home Delivery</h2>
                    <p className='text-[#606060]'>100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.</p>
                </div>

                <div className='bg-white hover:bg-[#CAEB66] text-center px-10 py-15 rounded-xl'>
                    <div className='bg-gray-100 p-3 inline-block rounded-full'>
                        <img className='text-center' src={serviceImg} alt="" />
                    </div>
                    <h2 className='text-xl dark:text-black font-bold my-3'>Corporate Service / Contract In Logisticsp</h2>
                    <p className='text-[#606060]'>Customized corporate services which includes warehouse and inventory management support.</p>
                </div>

                <div className='bg-white hover:bg-[#CAEB66] text-center px-10 py-15 rounded-xl'>
                    <div className='bg-gray-100 p-3 inline-block rounded-full'>
                        <img className='text-center' src={serviceImg} alt="" />
                    </div>
                    <h2 className='text-xl dark:text-black font-bold my-3'>Parcel Return</h2>
                    <p className='text-[#606060]'>Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.</p>
                </div>
              
             
            </div>

        </div>
    )
}
