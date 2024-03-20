import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wishListItems: [],
    wishListCounter:0,
};

export const wishListSlice= createSlice({
    name:'wishList',
    initialState,
    reducers:{
        setWishListItems:(state, actions)=>{
            const {_id, productName, productImage, productPrice}= actions.payload
            const isItemExist = state.wishListItems.some(item => item._id === _id);
            if (!isItemExist) {
                state.wishListItems.push({_id, productName, productImage, productPrice});
            }else{
                null
            }
        },

        removeWishListItems:(state, actions)=>{
            const {_id}= actions.payload
            state.wishListItems=state.wishListItems.filter(item=>item._id!==_id)
            state.wishListCounter=state.wishListCounter-1
        },

        clearWishListItems:(state, actions)=>{
            return{
                ...initialState
              }
        },

        setWishListCounter:(state, actions)=>{
            //wishList length is being set to counter
            state.wishListCounter=actions.payload
        },
    }
})
export const {setWishListItems, removeWishListItems, clearWishListItems, setWishListCounter} = wishListSlice.actions;
export default wishListSlice.reducer;