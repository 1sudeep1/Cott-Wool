import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  userDetails: {},
  token:'',
  isLoggedIn:false
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
        setUserLoginDetails:(state, actions)=>{
                return{
                    ...state,
                    userDetails:actions.payload.userByPhone,
                    token: actions.payload.token,
                    isLoggedIn:true
                }
        },

        setLogout:(state, actions)=>{
            state.isLoggedIn=false
        }
  }


});

export const {setUserLoginDetails, setLogout} = userSlice.actions;

export default userSlice.reducer;