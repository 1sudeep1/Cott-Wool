'use client'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaFacebook, FaTwitterSquare, FaInstagramSquare } from "react-icons/fa";
import Link from 'next/link';
import {Button} from '@nextui-org/button'; 

const Login =() => {
    return (
        <>
            <div className='bg-gray-200 text-white p-10 h-screen'>
                <Formik
                    initialValues={{
                        email:'',
                        password:''
                    }}

                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    
                >

                    {({ isSubmitting }) => (
                        <Form className='flex flex-col align-middle justify-center text-center max-w-[400px]
                        bg-gray-50 text-black gap-5 p-5 rounded-lg mx-auto mt-24
                        '>
                            <legend className='text-3xl font-semibold'>Login</legend>
                            <Field className='border p-1 rounded-md' type="email" name="email" placeholder="email" />
                            <ErrorMessage name="email" className='text-red-600' component="div" />
                            <Field className='border p-1 rounded-md' type="password" name="password" placeholder="password" />
                            <ErrorMessage name="password" component="div" />
                            <button className='bg-gray-700 text-white p-1  rounded-lg ' type="submit" >
                                Login
                            </button>
                            <div className='flex justify-between'>
                                <div>
                                    <p>Forgot Password?</p>
                                    <button className='text-blue-600'>Reset</button>
                                </div>

                                <div>
                                    <p>Don't have account? </p>
                                    <Link href='/register' className='text-blue-600'>Register</Link>
                                </div>
                            </div>

                            <div className='mx-auto'>
                                <p>or signup using</p>
                                <div className='text-2xl flex gap-2 my-2'>
                                    <FaFacebook className='text-[#375397]' />
                                    <FaTwitterSquare className='text-[#1C9CEA]' />
                                    <FaInstagramSquare className='text-[#C53A8A]' />
                                </div>
                            </div>
                        </Form>
                    )}

                </Formik>
            </div>
        </>
    )
}

export default Login