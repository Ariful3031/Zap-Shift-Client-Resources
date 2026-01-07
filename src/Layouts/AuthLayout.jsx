import React from 'react'
import Logo from '../Shared/Logo'
import { Outlet } from 'react-router'
import authImage from '../assets/authImage.png'

export default function AuthLayout() {
  return (
    <div className='max-w-7xl mx-auto'>
        <Logo></Logo>
        <div className='flex items-center '>
            <div className='flex-1 '>
                <Outlet></Outlet>
            </div>
            <div className='flex-1 flex justify-center items-center '>
                <img className='w-[425px]  h-[355px]' src={authImage} alt="" />
            </div>
        </div>
    </div>
  )
}
