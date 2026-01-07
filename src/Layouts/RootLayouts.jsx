import React from 'react'
import Navbar from '../Shared/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Shared/Footer'

export default function RootLayouts() {
  return (
   <div className='bg-[#EAECED]'>
     <div className='max-w-7xl mx-auto '>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
   </div>
  )
}
