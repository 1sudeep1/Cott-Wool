'use client'
import React, { useEffect, useState } from 'react'
import { Button, Image, Pagination } from '@nextui-org/react'
import { IoTrash, IoCart } from "react-icons/io5";
import Header from '../components/header/page'
import Footer from '../components/footer/page'
import { useDispatch, useSelector } from 'react-redux';
import { clearWishListItems, removeWishListItems } from '../redux/reducerSlices/wishListSlice';
import { useRouter } from 'next/navigation'
import { setCartItems, setCounter } from '../redux/reducerSlices/cartSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

const WishList = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [wishList, setWishList] = useState([])
    const { userDetails } = useSelector(state => state.user)
    const { cartItems } = useSelector(state => state.cart)
    const [count, setCount] = useState(0)
    const handleProduct = (id) => {
        router.push(`/product-details${id}`)
    }


    const fetchWishListItems = async (page=1) => {
        const wishListRes = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/wishlist/${userDetails._id}?page=${page}`)
        setWishList(wishListRes.data.getwishListItemsByUserId)
        setCount(wishListRes.data.count)
    }

    const clearWishList = async () => {
        dispatch(clearWishListItems())
        const res = await axios.delete(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/wishlists/${userDetails._id}`)
        const data = await res.data
        toast(data.check === true ? data.msg : data.msg,
            {
                icon: data.check === true ? '✅' : '❌',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );
        fetchWishListItems();
    }

    const handleRemoveWishListItem = async (wishListItem) => {
        dispatch(removeWishListItems(wishListItem))
        const res = await axios.delete(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/wishlist/${wishListItem._id}`)
        const data = await res.data
        toast(data.check === true ? data.msg : data.msg,
            {
                icon: data.check === true ? '✅' : '❌',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );
        fetchWishListItems();
    }



    const fetchCartItems = async () => {
        const cartRes = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/cart/${userDetails._id}`)
        dispatch(setCounter(cartRes.data.getCartItemsByUserId.length));
    }

    //function to save cart items to database
    const handleCart = async () => {
        if (!userDetails._id) {
            router.push('/login')
        } else {
            await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/cart`, { cartItems: cartItems, userId: userDetails._id })
        }
    }
    const handleCartItems = async (cartItem) => {
        try {
            // Set items to the cart with the help of cartReducer
            await dispatch(setCartItems(cartItem))

            // Save cart items to the database
            await handleCart();

            // Fetch updated cart items after saving to the database
            await fetchCartItems();
        } catch (error) {
            console.error('Error handling cart items:', error);
        }
    }

    useEffect(() => {
        fetchWishListItems();
        fetchCartItems();
    }, []);
    return (
        <>
            <Header />
            <h1 className='text-2xl text-center my-5'>My WishList</h1>
            <div className='flex justify-end me-10'>
                <Button onClick={clearWishList} className='border px-1 rounded-sm bg-red-600 text-white'>Clear WishList</Button>
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
                    {wishList.map((item) => (
                        <tr className='border hover:bg-green-100' key={item}>
                            <td className='mx-auto w-60'>
                                <div className='flex ps-10 gap-5 cursor-pointer' onClick={() => handleProduct(item._id)}>
                                    <Image src={`http://localhost:5000/uploads/products/${item.productImage}`} width={100} height={100} alt='product Image' />
                                    <div>
                                        <h1 className='text-lg'>{item.productName}</h1>
                                        <p className='text-green-600'>In stock</p>
                                    </div>
                                </div>
                            </td>
                            <td className='text-center w-20'>Rs. {item.productPrice}</td>
                            <td className='text-center  w-20 '><IoTrash onClick={() => handleRemoveWishListItem(item)} className='text-2xl text-red-600 mx-auto cursor-pointer' /></td>
                            <td className='text-center w-24'><IoCart onClick={() => handleCartItems(item)} className='text-3xl text-[#273D24] mx-auto cursor-pointer' /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination onChange={(page) => fetchWishListItems(page)} total={Math.ceil(count / 5) || 1} initialPage={1} />
            <Footer />
        </>
    )
}

export default WishList