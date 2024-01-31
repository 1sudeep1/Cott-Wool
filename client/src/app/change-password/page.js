'use client'
import React from 'react'
import NavAdmin from '../components/adminNavbar/page'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/header/page';
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Button } from "@nextui-org/react";
import toast from 'react-hot-toast';
import axios from 'axios'
import { setLogout } from '../redux/reducerSlices/userSlice';
import { useRouter } from 'next/navigation';

const getCharacterValidationError = (str) => {
  return (`Your password must have at least 1 ${str}`)
}


const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().min(5, 'password to short').required('please enter a current password').matches(/[0-9]/, getCharacterValidationError('digit')).matches(/[a-z]/, getCharacterValidationError('lowercase')).matches(/[A-Z]/, getCharacterValidationError('uppercase')),
  password: Yup.string().min(5, 'password to short').required('please enter a new password').matches(/[0-9]/, getCharacterValidationError('digit')).matches(/[a-z]/, getCharacterValidationError('lowercase')).matches(/[A-Z]/, getCharacterValidationError('uppercase')),
  confirmPassword: Yup.string().required('please retype your new password').oneOf([Yup.ref('password')], "password doesnot match")
})
const ChangePassword = () => {
  const dispatch= useDispatch()
  const router= useRouter()
  const { userDetails } = useSelector(state => state.user)
  const { role, _id} = userDetails

  const handleChangePassword = async (inputChanges) => {
    try {
      const res = await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/change-password`, inputChanges)
      const data = await res.data
      console.log(res.status)
      toast(data.status===true? data.msg : data.msg,
        {
          icon: data.status===true?'✅':'❌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );

      if(data.status===true){
        //after successful password change it will logout and will redirect to login page
        dispatch(setLogout())
        router.push("/login")
      }
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <>

      {role == "Admin" ? <NavAdmin /> : <Header />}
      <div className='bg-gray-200 text-white p-10 h-screen'>
        <Formik
          initialValues={{
            currentPassword: '',
            password: '',
            confirmPassword: ''
          }}

          validationSchema={changePasswordSchema}

          onSubmit={(values) => {
            
            values.id= _id
            handleChangePassword(values)
          }}
        >

          {({ errors, touched, handleChange }) => (
            <Form className='flex flex-col align-middle justify-center text-center max-w-[400px] bg-gray-50 text-black gap-5 p-5 rounded-lg mx-auto mt-24'>
              <legend className='text-3xl font-semibold'>Change Password</legend>

              <Field className='border p-1 rounded-md' type="password" name="currentPassword" placeholder="current password" onChange={handleChange} />
              {errors.currentPassword && touched.currentPassword ? (
                <div className='text-red-600'>{errors.currentPassword}</div>
              ) : null}

              <Field className='border p-1 rounded-md' type="password" name="password" placeholder="new password" onChange={handleChange} />
              {errors.password && touched.password ? (
                <div className='text-red-600'>{errors.password}</div>
              ) : null}

              <Field className='border p-1 rounded-md' type="password" name="confirmPassword" placeholder="retype new password" onChange={handleChange} />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className='text-red-600'>{errors.confirmPassword}</div>
              ) : null}

              <Button type='submit' color="primary" className='border p-2 rounded-lg bg-gray-500 text-white'>Save Changes</Button>

              {/* <div className='flex justify-between'>
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
              </div> */}

            </Form>
          )}

        </Formik>
      </div>
    </>
  )
}

export default ChangePassword