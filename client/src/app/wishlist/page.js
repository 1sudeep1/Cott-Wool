'use client'
import React from 'react'
import { Button, Image } from '@nextui-org/react'
import { IoTrash, IoCart } from "react-icons/io5";
import Header from '../components/header/page'
import Footer from '../components/footer/page'
import { useDispatch, useSelector } from 'react-redux';
import { clearWishListItems, removeWishListItems } from '../redux/reducerSlices/wishListSlice';
import { useRouter } from 'next/navigation'
import { setCartItems } from '../redux/reducerSlices/cartSlice';

const WishList = () => {
    const router= useRouter()
    const dispatch= useDispatch()
    const {wishListItems}= useSelector(state=>state.wishList)
    const handleProduct=(id)=>{
        router.push(`/product-details${id}`)
    }
    return (
        <>
            <Header />
            <h1 className='text-2xl text-center my-5'>My WishList</h1>
            <div className='flex justify-end me-10'>
            <Button onClick={()=>dispatch(clearWishListItems())} className='border px-1 rounded-sm bg-red-600 text-white'>Clear WishList</Button>
            </div>
            <table className="table-auto bg-white mx-auto w-full">
                <thead>
                    <tr className='border'>
                        <th className='p-3'>Product</th>
                        <th>Price</th>
                        <th>Delete</th>
                        <th>Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {wishListItems.map((item)=>(
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
                        <td className='text-center w-20'>Rs. {item.productPrice}</td>
                        <td className='text-center  w-20 '><IoTrash onClick={()=>dispatch(removeWishListItems(item))} className='text-2xl text-red-600 mx-auto cursor-pointer'/></td>
                        <td className='text-center w-24'><IoCart onClick={()=>dispatch(setCartItems(item))} className='text-3xl text-[#273D24] mx-auto cursor-pointer'/></td>            
                </tr>
                    ))}
                </tbody>
            </table>
            <Footer />
        </>
    )
}

export default WishList
