import {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit'
import { productSlice } from './productsSlice'
import { cartSlice } from './cartSlice'
import { apiSlice } from './apiSlice'

export const store=configureStore({
    reducer:{
        products:productSlice.reducer,
        cart:cartSlice.reducer,
        api:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware)
})