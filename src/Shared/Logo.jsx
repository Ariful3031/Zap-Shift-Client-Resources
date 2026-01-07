import React from 'react'
import logoImg from '../assets/logo.png'
import { Link } from 'react-router'

const Logo = () => {
    return (
        <Link to='/'>
            <div className='flex items-end'>
                <img src={logoImg} alt="" />
                <p className='text-[#303030] dark:text-white text-end text-3xl font-bold -ms-2'>ZapShift</p>
            </div>
        </Link>
    )
}

export default Logo
