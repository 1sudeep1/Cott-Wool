import React from 'react'

const Navbar=()=>{
    return(
        <>
            <h1>This is Navbar</h1>
        </>
    )
}
const Footer=()=>{
    return(
        <>
            <h1>This is Footer</h1>
        </>
    )
}

const LayoutProvider = ({children}) => {
    return (
        <>
            <Navbar />
                {children}
            <Footer />
        </>
    )
}

export default LayoutProvider