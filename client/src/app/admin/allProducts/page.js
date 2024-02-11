import GridProducts from '@/app/components/gridProductsAdmin/page'
import React from 'react'

const AllProducts = (props) => {
    
    return (
        <>
            <GridProducts allProducts={props.allProducts} />
        </>
    )
}

export default AllProducts