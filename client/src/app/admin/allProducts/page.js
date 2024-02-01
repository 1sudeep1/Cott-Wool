import GridProducts from '@/app/components/gridProducts/page'
import React from 'react'

const AllProducts = (props) => {
    
    return (
        <>
            <GridProducts allProducts={props.allProducts} />
        </>
    )
}

export default AllProducts