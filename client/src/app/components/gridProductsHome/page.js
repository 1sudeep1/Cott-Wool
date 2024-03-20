import { useRouter } from 'next/navigation';
import React, { useEffect} from 'react';
import { Button, Image} from "@nextui-org/react";
import { setCartItems, setCounter} from '@/app/redux/reducerSlices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setWishListCounter, setWishListItems } from '@/app/redux/reducerSlices/wishListSlice';
import axios from 'axios';
const GridProductsHome = (props) => {
    const dispatch= useDispatch()
    const router= useRouter()
    const allProducts = props.allProducts;
    const { cartItems} = useSelector(state => state.cart)
    const { wishListItems} = useSelector(state => state.wishList)
    const {userDetails}= useSelector(state=>state.user)
    const handleProduct=(id)=>{
        router.push(`/product-details/${id}`)
    }

    const fetchCartItems= async()=>{
        const cartRes=await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/cart/${userDetails._id}`)
        dispatch(setCounter(cartRes.data.getCartItemsByUserId.length));
    }

    //function to save cart items to database
    const handleCart = async () => {
        if(!userDetails._id){
            router.push('/login')
        }else{
            await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/cart`, {cartItems:cartItems, userId:userDetails._id})
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

    const fetchWishListItems= async()=>{
        const wishListRes=await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/wishlist/${userDetails._id}`)
        dispatch(setWishListCounter(wishListRes.data.getwishListItemsByUserId.length));
    }

        //function to save cart items to database
        const handleWishList = async () => {
            if(!userDetails._id){
                router.push('/login')
            }else{
                await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {wishListItems:wishListItems, userId:userDetails._id})
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
        fetchCartItems();
        fetchWishListItems();
    }, []);
    

    return (
        <section className="text-gray-600 body-font bg-white mt-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap gap-2">
                    {allProducts.length>0 && Array.isArray(allProducts) ?
                     allProducts.map((item) => {
                        try {
                            return (
                                <div className="p-4 w-[200px] h-auto shadow-lg cursor-pointer flex flex-col items-center justify-between" key={item._id} onClick={()=>handleProduct(item._id)} >
                                    <div>
                                        <Image
                                            width={150}
                                            alt="product image"
                                            src={`http://localhost:5000/uploads/products/${item.productImage}`}
                                        />
                                        <div className="">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font">{item.productCategory}</h3>
                                            <h2 className="text-gray-900 title-font text-lg font-medium">{item.productName}</h2>
                                            <p className="">Rs. {item.productPrice}</p>
                                        </div>
                                    </div>
                                    <div className=" text-white text-sm flex justify-between gap-5">
                                            <Button className='bg-[#3D550C] px-1 rounded-sm' onClick={()=>handleCartItems(item)}>Add to cart</Button>
                                            <Button className='bg-[#3D550C] px-1 rounded-sm' onClick={()=>handleWishListItems(item)}>wishlist</Button>
                                    </div>
                                </div>
                            );
                        } catch (error) {
                            console.error('Error processing image:', error);
                            return null;
                        }
                    }):<h1>{allProducts}</h1>
                }
                </div>
            </div>
        </section>
    );
};

export default GridProductsHome;