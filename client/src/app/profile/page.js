'use client'
import React from 'react'
import NavAdmin from '../components/adminNavbar/page'
import { useSelector } from 'react-redux'
import { Image } from "@nextui-org/react";
import Header from '../components/header/page';
const Profile = () => {
    const { userDetails } = useSelector(state => state.user)
    const {role, fullName, dob, phone, email}= userDetails
    return (
        <>
            {role=="Admin"?<NavAdmin />:<Header/>}
            
            
            <div className='md:flex  max-w-[1200px] md:mx-auto py-10  md:gap-40 items-center'>
                <div className='md:max-w-[600px]'>
                    <h1 className='text-3xl font-semibold'>{fullName}</h1>
                    <p className='font-semibold'>MERNSTACK DEVELOPER</p> <span>{dob}</span>
                    <p className='my-3'>Introducing yourself to new people can be exciting and nerve-wracking. After all, first impressions matter, and you want to ensure you're presenting yourself in the best possible way. "Tell me something about yourself?" can be one of the most challenging questions that are asked impulsively. Everyone is different and when you write about yourself, you should show your uniqueness.</p>
                    <p className='text-blue-600'>Contact Information: {phone}, {email}</p>
                </div>
                <div className='md:me-auto'>
                    <Image
                        isBlurred
                        src="https://e1.pxfuel.com/desktop-wallpaper/800/620/desktop-wallpaper-handsome-boys-by-himanshu-francis-on-vv-smart-and-attitude-boys.jpg"
                        alt="NextUI Album Cover"
                        className="w-[280px] h-[310px]"
                    />
                </div>
            </div>

        </>
    )
}

export default Profile