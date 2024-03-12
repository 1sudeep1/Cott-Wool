'use client'
import React, { useEffect } from 'react'
import { Button, Image, Pagination } from '@nextui-org/react'
import { IoTrash, IoCart } from "react-icons/io5";
import Header from '../components/header/page'
import Footer from '../components/footer/page'
import { useDispatch, useSelector } from 'react-redux';
import { clearWishListItems, removeWishListItems } from '../redux/reducerSlices/wishListSlice';
import { useRouter } from 'next/navigation'
import { setCartItems } from '../redux/reducerSlices/cartSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

const WishList = () => {
    const router= useRouter()
    const dispatch= useDispatch()
    const {wishListItems}= useSelector(state=>state.wishList)
    const handleProduct=(id)=>{
        router.push(`/product-details${id}`)
    }

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 4;
    const pages = Math.ceil(wishListItems.length / rowsPerPage);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return wishListItems.slice(start, end);
    }, [page, wishListItems]);

    const handleWishList = async () => {
        await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {wishListItems})
    }

    useEffect(() => {
        handleWishList()
    }, [wishListItems])

    const clearWishList=async()=>{
        dispatch(clearWishListItems())
        const res= await axios.delete(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/wishlist`)
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

    const handleRemoveWishListItem= async(wishListItem)=>{
        dispatch(removeWishListItems(wishListItem))
        const res= await axios.delete(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/wishlist/${wishListItem._id}`)
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
                    {items.map((item)=>(
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
                        <td className='text-center  w-20 '><IoTrash onClick={()=>handleRemoveWishListItem(item)} className='text-2xl text-red-600 mx-auto cursor-pointer'/></td>
                        <td className='text-center w-24'><IoCart onClick={()=>dispatch(setCartItems(item))} className='text-3xl text-[#273D24] mx-auto cursor-pointer'/></td>            
                </tr>
                    ))}
                </tbody>
            </table>
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

export default WishList
