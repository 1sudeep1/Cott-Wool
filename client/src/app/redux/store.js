import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './reducerSlices/userSlice'
import cartReducer from './reducerSlices/cartSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger'


const persistConfig = {
  key: 'root',
  storage,
}

const reducer=combineReducers({
  user:userReducer,
  cart:cartReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  // other options e.g middleware, go here

  middleware:()=>[logger]
})

export const persistor = persistStore(store)