import { addDoc, collection, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { db } from "../config/firebase.config";

export const getCartProductsService = async (userId) => {
    const q = query(
        collection(db, "addToCartStore"), where("userId", "==", userId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const saveProductIntoCartService = async (product) => {
    return await addDoc(collection(db, "addToCartStore"), {
        ...product
    });
}

export const getProductByIdService = async (productId) => {
    return doc(db, "addToCartStore", productId);
}

export const incrementCartProductsService = async (product, counts) => {
    await updateDoc(product, {
        count: counts + 1
    });
}

export const decrementCartProductsService = async (product, counts) => {
    await updateDoc(product, {
        count: counts - 1
    });
}

export const getCartProductByProductIdService = async (productId) => {
    const q = query(
        collection(db, "addToCartStore"), where("productId", "==", productId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}
