import React, { useEffect, useState } from 'react'
import { Button, Image} from "@nextui-org/react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
const page = (props) => {
    const router= useRouter()
    const [productsByCat, setProductsByCat]= useState([])

    const fetchProductsByCat= async()=>{
        try{
            const res= await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/category-products/${props.categoryTitle}`)
            const data= await res.data
            setProductsByCat(data.productByCategory)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchProductsByCat()
    },[])

    const handleProduct=(id)=>{
        router.push(`/product-details/${id}`)
    }
    return (
        <>
            <section className="text-gray-600 body-font bg-white mt-10">
                <div className="container mx-auto">
                <h1 className='text-xl font-semibold p-5'>{props.categoryTitle}</h1>
                    <div className="flex flex-wrap gap-2">
                        {productsByCat.map((item, id)=>(

                        <div className="p-4 w-[200px] h-auto shadow-lg cursor-pointer flex flex-col items-center justify-between" key={item._id} onClick={()=>handleProduct(item._id)}>
                            <div>
                                <Image
                                    width={150}
                                    alt="product image"
                                    src={`http://localhost:5000/uploads/products/${item.productImage}`}
                                />
                                <div>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">{item.productName}</h2>
                                    <p className="">Rs. {item.productPrice}</p>
                                </div>
                            </div>
                            <div className=" text-white text-sm flex justify-between gap-5">
                                <Button className='bg-[#3D550C] px-1 rounded-sm'>Add to cart</Button>
                                <Button className='bg-[#3D550C] px-1 rounded-sm'>wishlist</Button>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* <div>
            

        </div> */}

        </>
    )
}

export default page
