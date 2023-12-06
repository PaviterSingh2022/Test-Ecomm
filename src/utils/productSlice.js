import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { detailProduct } from "../data";
import { getProductsByCategoryIdService, getProductsService } from "../firebase/services/product.service";

const initialState = {
    allproducts: [],
    status: "",
    detailProduct: detailProduct,
    modalProduct: detailProduct,
    modalOpen: false
};

const productSlice = createSlice({
    name: "allproducts",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = "LOADING";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.allproducts = action.payload;
                state.status = "IDLE";
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "ERROR";
            });
    },
    reducers: {
        openModal(state, action) {
            state.modalProduct = action.payload;
            state.modalOpen = true;
        },

        closeModal(state, action) {
            state.modalOpen = false;
        },

        handleDetail(state, action) {
            state.detailProduct = action.payload;
        }
    }
});

export const fetchProducts = createAsyncThunk("fetch/prodcuts", async (id) => {
    if (id != '') {
        return await getProductsByCategoryIdService(id);

        // const q = query(
        //     collection(db, "storeProducts"), where("categoryId", "==", id)
        // )
        // // const collectionRef = collection(db, 'storeProducts');
        // return await getDocs(q).then((storeProduct) => {
        //     const allproducts = storeProduct.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        //     return allproducts;
        // })
    }
    else {
        return await getProductsService();
        // const collectionRef = collection(db, 'storeProducts');
        // return await getDocs(collectionRef).then((storeProduct) => {
        //     const allproducts = storeProduct.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        //     return allproducts;
        // })
    }
});

export const { openModal, closeModal, handleDetail } = productSlice.actions;

export default productSlice.reducer;