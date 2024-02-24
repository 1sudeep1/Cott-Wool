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
                <div className="flex flex-wrap gap-2 justify-around">
                    {allProducts.map((item) => {
                        try {

                            return (
                                <div className="p-4 w-[200px] h-80 shadow-lg cursor-pointer flex flex-col justify-center items-center" key={item._id} onClick={()=>handleProduct(item._id)} >
                                    <Image
                                        width={150}
                                        alt="product image"
                                        src={`http://localhost:5000/uploads/products/${item.productImage}`}
                                    />
                                    <div className="mt-4">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.productCategory}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{item.productName}</h2>
                                        <p className="mt-1">Rs. {item.productPrice}</p>
                                        <div className="flex justify-between text-white text-sm gap-5">
                                            <Button className='bg-[#3D550C] px-1 rounded-sm'>Add to cart</Button>
                                            <Button className='bg-[#3D550C] px-1 rounded-sm'>wishlist</Button>
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

export default GridProductsHome;