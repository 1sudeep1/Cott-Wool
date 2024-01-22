import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/reducerSlices/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // other options e.g middleware, go here
})