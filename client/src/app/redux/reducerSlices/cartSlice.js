import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    cartItems: [],
    cartCounter:0,
    totalAmount:0,
};

export const cartSlice= createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCartItems:(state, actions)=>{
            const {_id, productName, productImage, productPrice}= actions.payload
            const isItemExist = state.cartItems.some(item => item._id === _id);
            if (!isItemExist) {
                state.cartItems.push({ productName, productImage, productPrice, _id, quantity: 1, totalPrice:productPrice});
                state.cartCounter += 1;
                state.totalAmount += productPrice; 
            } else {
                const existingItem = state.cartItems.find(item => item._id === _id);
                if (existingItem) {
                    existingItem.quantity += 1;
                    existingItem.totalPrice=(productPrice * existingItem.quantity);
                    state.cartCounter += 1;
                    state.totalAmount += productPrice; 
                }
            }
        },   

        removeCartItems:(state, actions)=>{
            const { _id, quantity, productPrice} = actions.payload;
                
                state.totalAmount-=productPrice*quantity
                state.cartCounter -= quantity;

                state.cartItems = state.cartItems.filter(item => item._id !== _id);
        },

        clearCartItems:(state, actions)=>{
            return{
                ...initialState
              }
        }
    }
})

export const {setCartItems, removeCartItems, clearCartItems} = cartSlice.actions;

export default cartSlice.reducer;