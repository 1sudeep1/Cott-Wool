'use client'
import React from 'react'
import Header from '../components/header/page'
import Footer from '../components/footer/page'
import { Image } from '@nextui-org/react'
import { IoTrash } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import { removeCartItems } from '../redux/reducerSlices/cartSlice'

const CartItems = () => {
    const dispatch= useDispatch()
    const {cartItems, totalAmount}= useSelector(state=>state.cart)
    const finalPrice= totalAmount.toLocaleString();
    return (
        <>
            <Header />
            <h1 className='text-2xl text-center my-5'>Shopping Cart</h1>

            <table className="table-auto bg-white mx-auto w-full">
                <thead>
                    <tr className='border'>
                        <th className='border p-3'>Product</th>
                        <th className='border'>Quantity</th>
                        <th className='border'>Price</th>
                        <th className='border'>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item)=>(
                    <tr className='border' key={item}>
                        <td className='border mx-auto w-60'>
                            <div className='flex ps-10 gap-5'>
                                <Image src={`http://localhost:5000/uploads/products/${item.productImage}`} width={100} height={100} alt='product Image' />
                                <div>
                                    <h1 className='text-lg'>{item.productName}</h1>
                                    <p className='text-green-600'>In stock</p>
                                </div>
                            </div>
                        </td>
                        <td className='border text-center w-20'>{item.quantity}</td>
                        <td className='border text-center w-24'>Rs. {item.productPrice}</td>
                        <td className='border text-center w-24'>Rs. {item.totalPrice.toLocaleString()}</td>
                        <td className='border text-center text-xl w-20 text-red-600 ps-5' onClick={()=>dispatch(removeCartItems(item))}><IoTrash /></td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-end my-5 me-44'>
                <p className='text-2xl'>Total Price: Rs. {finalPrice}</p>
            </div>
            <Footer />
        </>
    )
}

export default CartItems
