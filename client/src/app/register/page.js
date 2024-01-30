'use client'
import { Formik, Form, Field } from 'formik'
import Link from 'next/link'
import React from 'react'
import * as Yup from 'yup'
import { Button } from "@nextui-org/react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import Header from '../components/header/page'
import Footer from '../components/footer/page'
import axios from 'axios'


const getCharacterValidationError = (str) => {
    return (`Your password must have at least 1 ${str}`)
}

const SignupSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short').max(50, 'Too Long').required('First Name is required'),
    lastName: Yup.string().min(2, 'Too Short').max(50, 'Too Long').required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.number().typeError("That doesn't look like a phone number").positive("A phone number can't start with a minus").integer("A phone number can't include a decimal point").min(8).required('A phone number is required'),
    gender: Yup.string().required('Gender is required'),
    dob: Yup.date().max(new Date(Date.now() - 567648000000)).required('date of birth is required'),
    password: Yup.string().min(5, 'password to short').required('please enter a password').matches(/[0-9]/, getCharacterValidationError('digit')).matches(/[a-z]/, getCharacterValidationError('lowercase')).matches(/[A-Z]/, getCharacterValidationError('uppercase')),
    confirmPassword: Yup.string().required('please retype your password').oneOf([Yup.ref('password')], "password doesnot match")
})


const Register = () => {

    const router = useRouter()
    const handleRegister = async (inputItem) => {
        try {
            const res = await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/register`, inputItem)
            const data = await res.data //controller function, response will convert in json

            //alert message using react hot tost
            toast(res.status === 200 ? data.msg + '. please login ' : data.msg,
                {
                    icon: res.status === 200 ? '✅' : '❌',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );

            if (res.status === 200) {
                router.push('/login')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Header />
            {/* it displays the alert message from top */}
            <Toaster />
            <div className='bg-gray-200 py-10'>
                <div className='max-w-[800px] mx-auto bg-gray-50 p-14 rounded-xl'>
                    <h1 className='text-3xl font-bold text-center'>Register Page</h1>
                    <Formik

                        initialValues={{
                            
                            firstName: '',
                            lastName: '',
                            email: '',
                            phone: '',
                            gender: '',
                            dob: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={SignupSchema}

                        onSubmit={(values, { resetForm }) => {
                            const fullName= `${values.firstName} ${values.lastName}`
                            const inputData={ ...values, fullName }
                            handleRegister(inputData)
                            resetForm();
                        }}

                    >

                        {({ errors, touched, handleChange }) => (
                            <Form className='mx-auto my-16'>
                                <div className='md:flex justify-between items-center gap-5 md:gap-3 my-5'>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <label className='text-xl' htmlFor="firstName">First Name <span className='text-red-600'>*</span></label>
                                        <Field name='firstName' id='firstName' placeholder='First Name' className='text-sm p-2 border rounded-lg' onChange={handleChange} />
                                        {errors.firstName && touched.firstName ? (
                                            <div className='text-red-600'>{errors.firstName}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <label className='text-xl' htmlFor="lastName">Last Name <span className='text-red-600'>*</span></label>
                                        <Field name='lastName' id='lastName' placeholder='Last Name' className='text-sm p-2 border rounded-lg' onChange={handleChange} />
                                        {errors.lastName && touched.lastName ? (
                                            <div className='text-red-600'>{errors.lastName}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2 w-full my-5'>
                                    <label className='text-xl' htmlFor="email">Email <span className='text-red-600'>*</span></label>
                                    <Field type='email' name='email' id='email' placeholder='Email' className='text-sm p-2 border rounded-lg' onChange={handleChange} />
                                    {errors.email && touched.email ? (
                                        <div className='text-red-600'>{errors.email}</div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col gap-2 w-full my-5'>
                                    <label className='text-xl' htmlFor="phone">Phone <span className='text-red-600'>*</span></label>
                                    <Field type='number' name='phone' id='phone' placeholder='Phone' className='text-sm p-2 border rounded-lg' onChange={handleChange} />
                                    {errors.phone && touched.phone ? (
                                        <div className='text-red-600'>{errors.phone}</div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col gap-2 w-full'>
                                    <label className='text-xl'>Gender <span className='text-red-600'>*</span></label>
                                    <div className='flex items-center gap-3'>
                                        <div>
                                            <Field type='radio' name='gender' id='male' value='male' onChange={handleChange} />
                                            <label htmlFor='male'>Male</label>
                                        </div>
                                        <div>
                                            <Field type='radio' name='gender' id='female' value='female' onChange={handleChange} />
                                            <label htmlFor='female'>Female</label>
                                        </div>
                                    </div>
                                    {errors.gender && touched.gender ? (
                                        <div className='text-red-600'>{errors.gender}</div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col gap-2 w-full my-5'>
                                    <label className='text-xl' htmlFor="dob">Date of Birth <span className='text-red-600'>*</span></label>
                                    <Field type='date' name='dob' id='dob' className='text-sm p-2 border rounded-lg' onChange={handleChange} />
                                    {errors.dob && touched.dob ? (
                                        <div className='text-red-600'>{errors.dob}</div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col gap-2 w-full my-5'>
                                    <label className='text-xl' htmlFor="password">Password<span className='text-red-600'>*</span></label>
                                    <Field type='password' name='password' id='password' className='text-sm p-2 border rounded-lg' onChange={handleChange} />
                                    {errors.password && touched.password ? (
                                        <div className='text-red-600'>{errors.password}</div>
                                    ) : null}
                                </div>

                                <div className='flex flex-col gap-2 w-full my-5'>
                                    <label className='text-xl' htmlFor="confirmPassword">Confirm Password<span className='text-red-600'>*</span></label>
                                    <Field type='password' name='confirmPassword' id='confirmPassword' className='text-sm p-2 border rounded-lg' onChange={handleChange} />
                                    {errors.confirmPassword && touched.confirmPassword ? (
                                        <div className='text-red-600'>{errors.confirmPassword}</div>
                                    ) : null}
                                </div>

                                <Button type='submit' color="primary" className='border p-2 rounded-lg bg-gray-500 text-white'>Register</Button>

                                <p className='text-center my-5'>Already have account? <Link className='text-white bg-blue-700 p-[4px] rounded-lg' href='/login'>Login</Link></p>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <Footer />
        </>
    )
}


export default Register