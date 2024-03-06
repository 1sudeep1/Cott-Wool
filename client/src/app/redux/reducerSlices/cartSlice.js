import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    cartItems: [],
    cartCounter:0,
    totalPrice:0,
};

export const cartSlice= createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCartItems:(state, actions)=>{
            const {_id, productName, productImage, productPrice}= actions.payload
            const formattedProductPrice = productPrice.toLocaleString(); // Format productPrice
            const isItemExist = state.cartItems.some(item => item._id === _id);
            if (!isItemExist) {
                state.cartItems.push({ productName, productImage, productPrice:formattedProductPrice, _id, quantity: 1, totalPrice:formattedProductPrice });
                state.cartCounter += 1;
                state.totalPrice += parseFloat(productPrice); 
            } else {
                const existingItem = state.cartItems.find(item => item._id === _id);
                if (existingItem) {
                    existingItem.quantity += 1;
                    existingItem.totalPrice=(productPrice * existingItem.quantity).toLocaleString();
                    state.cartCounter += 1;
                    state.totalPrice += parseFloat(productPrice); 
                }
            }
        }
        
    }
})

export const {setCartItems} = cartSlice.actions;

export default cartSlice.reducer;