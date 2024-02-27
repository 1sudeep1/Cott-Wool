import { useRouter } from 'next/navigation';
import React from 'react';
import { Button, Image} from "@nextui-org/react";
const GridProductsHome = (props) => {
    const router= useRouter()
    const allProducts = props.allProducts;

    const handleProduct=(id)=>{
        router.push(`/product-details/${id}`)
    }


    return (
        <section className="text-gray-600 body-font bg-white mt-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap gap-2">
                    {allProducts.map((item) => {
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
                                            <Button className='bg-[#3D550C] px-1 rounded-sm'>Add to cart</Button>
                                            <Button className='bg-[#3D550C] px-1 rounded-sm'>wishlist</Button>
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

export default GridProductsHome;