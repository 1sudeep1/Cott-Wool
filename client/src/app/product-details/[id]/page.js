'use client'
import Header from '@/app/components/header/page'
import { setCartItems, setCounter } from '@/app/redux/reducerSlices/cartSlice'
import { setWishListCounter, setWishListItems } from '@/app/redux/reducerSlices/wishListSlice'
import { Button, Image } from '@nextui-org/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const page = ({ params }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [productDetails, setProductDetails] = useState([])
  const { cartItems } = useSelector(state => state.cart)
  const { wishListItems } = useSelector(state => state.wishList)
  const { userDetails } = useSelector(state => state.user)

  const fetchProductById = async () => {
    const res = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/product-details/${params.id}`)
    const data = await res.data;
    setProductDetails(data.productById)
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

  const fetchWishListItems = async () => {
    const wishListRes = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/wishlist/${userDetails._id}`)
    dispatch(setWishListCounter(wishListRes.data.getwishListItemsByUserId.length));
  }

  //function to save cart items to database
  const handleWishList = async () => {
    if (!userDetails._id) {
      router.push('/login')
    } else {
      await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/wishlist`, { wishListItems: wishListItems, userId: userDetails._id })
    }
  }

  const handleWishListItems = async (wishListItem) => {
    try {
      // Set items to the cart with the help of cartReducer
      await dispatch(setWishListItems(wishListItem))

      // Save cart items to the database
      await handleWishList();

      // Fetch updated cart items after saving to the database
      await fetchWishListItems();
    } catch (error) {
      console.error('Error handling cart items:', error);
    }
  }


  useEffect(() => {
    fetchProductById();
    fetchCartItems();
    fetchWishListItems();
  }, [])

  return (
    <>
      <Header />
      <section className='max-w-[1200px] mx-auto'>
        <div className='my-5 flex gap-5'>
          <Image src={`http://localhost:5000/uploads/products/${productDetails.productImage}`} width={250} height={300} />
          <div className='leading-10'>
            <h1 className='text-3xl'>{productDetails.productName}</h1>
            <p>{productDetails.productDescription}</p>
            <p className='text-xl'>Rs. {productDetails.productPrice}</p>
            <Button color="primary" className='border px-2 rounded-lg bg-[#3D550C] text-white my-5' onClick={() => handleCartItems(productDetails)}>Add to Cart</Button>
            <Button color="primary" className='border px-2 rounded-lg bg-[#3D550C] text-white my-5' onClick={() => handleWishListItems(productDetails)}>Add to Wishlist</Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default page
