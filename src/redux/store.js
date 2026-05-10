import { configureStore } from "@reduxjs/toolkit"
import courseReducer from './courseSlice'
import cartReducer from './cartSlice'

export const store = configureStore({
    reducer: {
        courses: courseReducer,
        cart: cartReducer,
    },
})