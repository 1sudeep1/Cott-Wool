'use client'
import React from 'react'
import ProductByCategory from '../../components/productByCategory/page';
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
const CategoryProduct = ({params}) => {
    return (
        <>
        <Header/>
            <ProductByCategory categoryTitle={params?.category} />
            <Footer/>
        </>
    )
}

export default CategoryProduct
