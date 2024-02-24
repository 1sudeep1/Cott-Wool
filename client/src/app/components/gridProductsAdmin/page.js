import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Button, Image } from "@nextui-org/react";

const GridProducts = (props) => {
    const allProducts = props.allProducts;

    const [productId, setProductId] = useState('')

    const deleteProduct = async () => {
        try {
            const res = await axios.delete(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`)
            const data = await res.data
            toast(res.status === 200 ? data.msg : data.msg,
                {
                    icon: res.status === 200 ? '✅' : '❌',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (itemId) => {
        setProductId(itemId)
        await deleteProduct()
    }




    return (
        <section className="text-gray-600 body-font">
            <div className="container">
                <div className="flex flex-wrap m-4 gap-3 mx-auto">
                    {allProducts.map((item) => {
                        try {

                            return (
                                <div className="lg:w-[185px] md:w-1/2 p-4 w-full h-56 shadow-lg flex flex-col justify-center items-center gap-5" key={item._id}>
                                    <Image
                                        width={80}
                                        alt="product image"
                                        src={`http://localhost:5000/uploads/products/${item.productImage}`}
                                    />

                                    <div>
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font">{item.productCategory}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{item.productName}</h2>
                                        <p>Rs. {item.productPrice}</p>

                                        <div className="flex justify-between gap-14">
                                            <Button className='text-blue-700'>Edit</Button>
                                            <Button onClick={(e) => handleDelete(item._id)} className='text-red-600'>Delete</Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        } catch (error) {
                            console.error('Error processing image:', error);
                            return null;
                        }
                    })}
                </div>
            </div>
        </section>
    );
};

export default GridProducts;