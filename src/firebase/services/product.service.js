import { collection, doc,deleteDoc, getDocs, query, where,addDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";

export const getCategoryService = async () => {
    const q = query(
        collection(db, "productCategory")
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getProductsByCategoryIdService = async (categoryId) => {
    const q = query(
        collection(db, "storeProducts"), where("categoryId", "==", categoryId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getProductsService = async () => {
    const q = query(
        collection(db, "storeProducts")
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const deleteRecordFromFirebaseService = async (doc) => {
    await deleteDoc(doc);
}
export const getProductsServiceByUserId = async (userId) => {
    const q = query(
        collection(db, "storeProducts"), where("userId", "==", userId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getProductByProductIdService = async (productId) => {
    const q = query(
        collection(db, "storeProducts"), where("productId", "==", productId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const saveProductIntoStoreProductService = async (product) => {
    return await addDoc(collection(db, "storeProducts"), {
        ...product
    });
}
export const getProductByIdService = async (productId) => {
    return doc(db, "storeProducts", productId);
}