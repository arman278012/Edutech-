import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems: [],
}

const cartSlice = createSlice({
    name: "cart",

    initialState,

    reducers: {
        // ADD TO CART
        addToCart: (state, action) => {
            const existingItem =
                state.cartItems.find(
                    (item) =>
                        item._id === action.payload._id
                )

            if (!existingItem) {
                state.cartItems.push(action.payload)
            }
        },

        // REMOVE FROM CART
        removeFromCart: (state, action) => {
            state.cartItems =
                state.cartItems.filter(
                    (item) => item._id !== action.payload
                )
        },
    },
})

export const {
    addToCart,
    removeFromCart,
} = cartSlice.actions

export default cartSlice.reducer