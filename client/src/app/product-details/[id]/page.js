'use client'
import Header from '@/app/components/header/page'
import { Button, Image } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {
  const [productDetails, setProductDetails] = useState([])

  const fetchProductById = async () => {
    const res = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/product-details/${params.id}`)
    const data = await res.data;
    setProductDetails(data.productById)
  }

  useEffect(() => {
    fetchProductById()
  }, [])
  return (
    <>
      <Header />
      <section className='max-w-[1200px] mx-auto'>
          <div className='my-5 flex gap-5'>
            <Image src={productDetails.productImage} />
            <div className='leading-10'>
              <h1 className='text-3xl'>{productDetails.productName}</h1>
              <p>{productDetails.productDescription}</p>
              <p className='text-xl'>Rs. {productDetails.productPrice}</p>
              <Button>Add to Cart</Button>
            </div>
          </div>
      </section>
    </>
  )
}

export default page
