import { Button } from '@nextui-org/react';
import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const GridProducts = (props) => {
    const allProducts = props.allProducts;

    // Convert buffer to Data URL
    const bufferToDataURL = (buffer, mimeType) => {
        return `data:${mimeType};base64,${Buffer.from(buffer).toString('base64')}`;
    };

    const [productId, setProductId]= useState('')

    const deleteProduct= async()=>{
        try{
            const res= await axios.delete(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`)
            const data= await res.data
            toast(res.status===200? data.msg : data.msg,
                {
                  icon: res.status===200?'✅':'❌',
                  style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  },
                }
              );
        }catch(err){
            console.log(err)
        }
    }

    const handleDelete=async(itemId)=>{
        setProductId(itemId)
        await deleteProduct()
    }




    return (
        <section className="text-gray-600 body-font">
            <div className="container">
                <div className="flex flex-wrap m-4 gap-3 mx-auto">
                    {allProducts.map((item) => {
                        try {
                            // Assuming the correct MIME type for your images is 'image/jpeg'
                            const imageSrc = bufferToDataURL(item.productImage, 'image/jpeg');

                            if (!imageSrc) {
                                console.error('Invalid image data:', item.productImage);
                                return null;
                            }

                            return (
                                <div className="lg:w-[180px] md:w-1/2 p-4 w-full h-64 shadow-lg" key={item._id}>
                                    <a className="block relative h-30 rounded overflow-hidden">
                                        <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={imageSrc} />
                                    </a>
                                    <div className="mt-4">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.productCategory}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{item.productName}</h2>
                                        <p className="mt-1">{item.productPrice}</p>
                                        <div className="flex justify-between">
                                            <Button className='text-blue-700'>Edit</Button>
                                            <Button onClick={(e)=>handleDelete(item._id)} className='text-red-600'>Delete</Button>
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