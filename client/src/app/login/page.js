'use client'
import { Formik, Form, Field } from 'formik'
import Link from 'next/link'
import React from 'react'
import * as Yup from 'yup'
import { Button } from "@nextui-org/react";
import { FaFacebook, FaTwitterSquare, FaInstagramSquare } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'


const getCharacterValidationError = (str) => {
    return (`Your password must have at least 1 ${str}`)
}


const SigninSchema = Yup.object().shape({
    phone: Yup.number().typeError("That doesn't look like a phone number").positive("A phone number can't start with a minus").integer("A phone number can't include a decimal point").min(8).required('A phone number is required'),
    password: Yup.string().min(5, 'password to short').required('please enter a password').matches(/[0-9]/, getCharacterValidationError('digit')).matches(/[a-z]/, getCharacterValidationError('lowercase')).matches(/[A-Z]/, getCharacterValidationError('uppercase')),
})

const Login = () => {
    const router = useRouter()
    const handleLogin = async (inputLogin) => {
        console.log('login values', inputLogin);

        try {
            const res = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify(inputLogin)
            });


            // Assuming the server sends a JSON response with a 'msg' property
            const data = await res.json();
            
            //alert message using react hot tost
            // if(res.status==200){
            //     router.push('/')
            //     toast(data.msg, {
            //         icon: '✅',
            //         style: {
            //             borderRadius: '10px',
            //             background: '#333',
            //             color: '#fff',
            //         },
            //     })
            // }else{
            //     toast(data.msg, {
            //         icon: '❌',
            //         style: {
            //             borderRadius: '10px',
            //             background: '#333',
            //             color: '#fff',
            //         },
            //     })
            // }


            toast(res.status===200? data.msg : data.msg,
            {
              icon: res.status===200?'✅':'❌',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }
          );

          if(res.status===200){
            router.push('/')
          }

        } catch (error) {
            console.error('Error during login:', error.message);
            // Handle error, e.g., display an error message to the user
        }
    };


    return (
        <>
            <div className='bg-gray-200 text-white p-10 h-screen'>

                <Formik
                    initialValues={{
                        phone: '',
                        password: '',
                    }}

                    validationSchema={SigninSchema}

                    onSubmit={(values) => {
                        handleLogin(values)
                    }}
                >


                    {({ errors, touched, handleChange }) => (
                        <Form className='flex flex-col align-middle justify-center text-center max-w-[400px] bg-gray-50 text-black gap-5 p-5 rounded-lg mx-auto mt-24'>
                            <legend className='text-3xl font-semibold'>Login</legend>

                            <Field className='border p-1 rounded-md' type="number" name="phone" placeholder="enter your phone number" onChange={handleChange} />
                            {errors.phone && touched.phone ? (
                                <div className='text-red-600'>{errors.phone}</div>
                            ) : null}

                            <Field className='border p-1 rounded-md' type="password" name="password" placeholder="password" onChange={handleChange} />
                            {errors.password && touched.password ? (
                                <div className='text-red-600'>{errors.password}</div>
                            ) : null}

                            <Button type='submit' color="primary" className='border p-2 rounded-lg bg-gray-500 text-white'>Login</Button>

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