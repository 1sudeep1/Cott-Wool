import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    cartItems: {},
    cartCounter:1,
};

export const cartSlice= createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCartItems:(state, actions)=>{
            const {productName, productImage, productPrice}= actions.payload
            return{
                ...state,
                cartItems: [productName, productImage, productPrice ],
                cartCounter: state.cartCounter + 1
            }
        }
    }
})

export const {setCartItems} = cartSlice.actions;

export default cartSlice.reducer;