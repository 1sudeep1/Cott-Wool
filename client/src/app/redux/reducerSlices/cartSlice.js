import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    //no need of totalAmount because in cartpage totalPrice is also been fetched from the database.
    cartItems: [],
    counter:0, //no need of counter increment and decrement because cartList length is also being fetched 
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
            } else {
                const existingItem = state.cartItems.find(item => item._id === _id);
                if (existingItem) {
                    existingItem.quantity += 1;
                    existingItem.totalPrice=(productPrice * existingItem.quantity);
                }
            }
        },   


        //no need to decrement of quantity and total price because in cart page they are being fetched from database
        removeCartItems:(state, actions)=>{
            const { _id} = actions.payload;
                state.cartItems = state.cartItems.filter(item => item._id !== _id);
        },

        clearCartItems:(state, actions)=>{
            return{
                ...initialState
              }
        },

        setCounter:(state, actions)=>{
            //cart list length is being set to counter
            state.counter=actions.payload
        },
    }
})

export const {setCartItems, removeCartItems, clearCartItems, setCounter} = cartSlice.actions;

export default cartSlice.reducer;