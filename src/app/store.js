"use client"
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import cardReducer from "../features/Cart/cartSlice";
import { drawerReducer } from "../features/Cart/Drawer";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        cart: cardReducer,
        drawer: drawerReducer,
    },
});

