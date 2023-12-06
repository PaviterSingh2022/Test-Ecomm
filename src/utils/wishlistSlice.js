import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWishlistByUserIdService } from "../firebase/services/wishlist.service";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlist: localStorage.getItem("wishlist") != null ? JSON.parse(localStorage.getItem("wishlist")) : [],
        status: ""
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlistProducts.pending, (state, action) => {
                state.status = "LOADING";
            })
            .addCase(fetchWishlistProducts.fulfilled, (state, action) => {
                state.wishlist = action.payload;
                state.status = "IDLE";
            })
            .addCase(fetchWishlistProducts.rejected, (state, action) => {
                state.status = "ERROR";
            });
    },
    reducers: {
        addToWishlist(state, action) {
            //if that action product has already in wishlist then if block will work
            const itemIndex = state.wishlist.findIndex(
                (item) => item.inWishlist === action.payload.inWishlist
            );
            state.wishlist.push(action.payload);
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
            // if (itemIndex >= 0) {
            //     state.wishlist[itemIndex].count += 1;
            //     state.wishlist[itemIndex].inWishlist = true;
            // } else {
            //     const product = { ...action.payload, count: 1 };
            //     state.wishlist.push(product);
            // }
            //localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
        },

        removeFromWishlist(state, action) {
            const updatedWishlist = state.wishlist.filter((p) => p.id !== action.payload.id);
            state.wishlist = updatedWishlist;
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
        },

        removeAll(state, action) {
            state.wishlist = [];
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
        },
    }
});

export const fetchWishlistProducts = createAsyncThunk("fetch/wishlistProducts", async (userId) => {
    return getWishlistByUserIdService(userId);

    // const collectionRef = query(
    //     collection(db, "storeWishlist"), where("userId", "==", userId)
    // )
    // return await getDocs(collectionRef).then((storeProduct) => {
    //     const wishlistProducts = storeProduct.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //     return wishlistProducts;
    // })
});

export const { addToWishlist, removeFromWishlist, removeAll } = wishlistSlice.actions;

export default wishlistSlice.reducer;