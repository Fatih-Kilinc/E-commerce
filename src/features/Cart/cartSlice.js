"use client"
import { createSlice } from "@reduxjs/toolkit";



export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload];
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },
    },
});
export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
