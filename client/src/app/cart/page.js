'use client'
import React from 'react'
import Header from '../components/header/page'
import Footer from '../components/footer/page'
import { Image, Button} from '@nextui-org/react'
import { IoTrash } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import { clearCartItems, removeCartItems } from '../redux/reducerSlices/cartSlice'
import { useRouter } from 'next/navigation'

const CartItems = () => {
    const router= useRouter()
    const dispatch= useDispatch()
    const {cartItems, totalAmount}= useSelector(state=>state.cart)
    const finalPrice= totalAmount.toLocaleString();

    const handleProduct=(id)=>{
        router.push(`/product-details/${id}`)
    }
    return (
        <>
            <Header />
            <h1 className='text-2xl text-center my-5'>Shopping Cart</h1>
            <div className='flex justify-end me-10'>
            <Button onClick={()=>dispatch(clearCartItems())} className='border px-1 rounded-sm bg-red-600 text-white'>Clear Cart</Button>
            </div>

            <table className="table-auto bg-white mx-auto w-full">
                <thead>
                    <tr className='border'>
                        <th className='p-3'>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.length>0? cartItems.map((item)=>(
                    <tr className='border hover:bg-green-100' key={item}>
                        <td className='mx-auto w-60'>
                            <div className='flex ps-10 gap-5 cursor-pointer' onClick={()=>handleProduct(item._id)}>
                                <Image src={`http://localhost:5000/uploads/products/${item.productImage}`} width={100} height={100} alt='product Image' />
                                <div>
                                    <h1 className='text-lg'>{item.productName}</h1>
                                    <p className='text-green-600'>In stock</p>
                                </div>
                            </div>
                        </td>
                        <td className='text-center w-20'>{item.quantity}</td>
                        <td className='text-center w-24'>Rs. {item.productPrice}</td>
                        <td className='text-center w-24'>Rs. {item.totalPrice.toLocaleString()}</td>
                        <td className='text-center text-xl w-20 text-red-600 ps-5 cursor-pointer' onClick={()=>dispatch(removeCartItems(item))}><IoTrash className='text-2xl text-red-600 mx-auto' /></td>
                    </tr>
                    )):null}
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
