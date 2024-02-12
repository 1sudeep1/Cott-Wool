import { useRouter } from 'next/navigation';
import React from 'react';

const GridProductsHome = (props) => {
    const router= useRouter()
    const allProducts = props.allProducts;

    // Convert buffer to Data URL
    const bufferToDataURL = (buffer, mimeType) => {
        return `data:${mimeType};base64,${Buffer.from(buffer).toString('base64')}`;
    };

    const handleProduct=(id)=>{
        router.push(`/product-details/${id}`)
    }


    return (
        <section className="text-gray-600 body-font bg-white mt-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap gap-2 justify-around">
                    {allProducts.map((item) => {
                        try {
                            // Assuming the correct MIME type for your images is 'image/jpeg'
                            const imageSrc = bufferToDataURL(item.productImage, 'image/jpeg');

                            if (!imageSrc) {
                                console.error('Invalid image data:', item.productImage);
                                return null;
                            }

                            return (
                                <div className="p-4 w-[200px] h-64 shadow-lg cursor-pointer" key={item._id} onClick={()=>handleProduct(item._id)} >
                                    <a className="block relative h-30 rounded overflow-hidden">
                                        <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={imageSrc} />
                                    </a>
                                    <div className="mt-4">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.productCategory}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{item.productName}</h2>
                                        <p className="mt-1">{item.productPrice}</p>
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