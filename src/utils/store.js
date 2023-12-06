import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import wishlistSlice from "./wishlistSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        wishlist: wishlistSlice,
        allproducts: productSlice
    }
});

export default store;