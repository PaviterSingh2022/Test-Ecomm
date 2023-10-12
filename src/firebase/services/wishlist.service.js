import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase.config";

export const addProductToWishlistService = async (product) => {
    return await addDoc(collection(db, "storeWishlist"), {
        product
    });
}

export const wishlistService = async (userId) => {
    const q = query(
        collection(db, "storeWishlist"), where("userId", "==", userId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const wishlistByIdService = async (productId) => {
    return doc(db, "storeWishlist", productId);
}

export const wishlistByUserIdService = async (userId) => {
    const q = query(
        collection(db, "storeWishlist"), where("userId", "==", userId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}