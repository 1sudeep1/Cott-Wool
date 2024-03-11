'use client'
import React, { useEffect } from 'react'
import Header from '../components/header/page'
import Footer from '../components/footer/page'
import { Image, Button, Pagination } from '@nextui-org/react'
import { IoTrash } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import { clearCartItems, removeCartItems } from '../redux/reducerSlices/cartSlice'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast';


const CartItems = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { cartItems, totalAmount } = useSelector(state => state.cart)
    const finalPrice = totalAmount.toLocaleString();

    const handleProduct = (id) => {
        router.push(`/product-details/${id}`)
    }

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 4;
    const pages = Math.ceil(cartItems.length / rowsPerPage);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return cartItems.slice(start, end);
    }, [page, cartItems]);

    const handleCart = async () => {
        await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/cart`, {cartItems})
    }

    useEffect(() => {
        handleCart()
    }, [cartItems])
    


    const clearCart=async()=>{
        dispatch(clearCartItems())
        const res= await axios.delete(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/cart`)
        const data = await res.data
        toast(data.check===true? data.msg : data.msg,
            {
              icon: data.check===true?'✅':'❌',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }
          );
    }

    const handleRemoveCartItem= async(cartItem)=>{
        dispatch(removeCartItems(cartItem))
        const res= await axios.delete(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/cart/${cartItem._id}`)
        const data = await res.data
        console.log(data)
    }

    return (
        <>
            <Header />
            <h1 className='text-2xl text-center my-5'>Shopping Cart</h1>
            <div className='flex justify-end me-10'>
                <Button onClick={clearCart} className='border px-1 rounded-sm bg-red-600 text-white'>Clear Cart</Button>
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
                    {items.length > 0 ? items.map((item) => (
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
                            <td className='text-center w-20'>{item.quantity}</td>
                            <td className='text-center w-24'>Rs. {item.productPrice}</td>
                            <td className='text-center w-24'>Rs. {item.totalPrice.toLocaleString()}</td>
                            <td className='text-center text-xl w-20 text-red-600 ps-5 cursor-pointer' onClick={() => handleRemoveCartItem(item)}><IoTrash className='text-2xl text-red-600 mx-auto' /></td>
                        </tr>
                    )) : null}
                </tbody>
            </table>
            <div className='flex justify-end my-5 me-44'>
                <p className='text-2xl'>Total Price: Rs. {finalPrice}</p>
            </div>
            <Pagination className='w-full'
                isCompact
                showControls
                showShadow
                color='success'
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
            />
            <Footer />
        </>
    )
}

export default CartItems
