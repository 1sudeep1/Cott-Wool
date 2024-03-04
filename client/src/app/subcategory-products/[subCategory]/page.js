'use client'
import React from 'react'
import Footer from '@/app/components/footer/page'
import Header from '@/app/components/header/page'
import ProductBySubCategory from '@/app/components/productBySubCategory/page'
const SubCategoryProducts = ({params}) => {
    return (
        <>
            <Header/>
                <ProductBySubCategory categoryTitle={params.subCategory}/>
            <Footer/>
        </>
    )
}

export default SubCategoryProducts
