import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from '../redux/reducerSlices/userSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
  key: 'root',
  storage,
}

const reducer=combineReducers({
  user:userReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  // other options e.g middleware, go here
})

export const persistor = persistStore(store)