import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { toast } from "react-toastify";
import { deleteRecordFromFirebaseService } from "./product.service";


export const saveCartOrderService = async (cartArray) => {
    const collectionRef = collection(db, "productOrders");
    const batch = writeBatch(db);

    cartArray.forEach((data) => {
        const addToCartDoc = doc(db, "addToCartStore", data.id);
        deleteRecordFromFirebaseService(addToCartDoc)
        const docref = doc(collectionRef);
        batch.set(docref, data);
    });

    batch
        .commit()
        .then(() => {
            console.log("batch write operation completed");
            toast.success(`order placed successfully`, {
                autoClose: 1000,
            });
            // clearCart();
        })
        .catch((error) => {
            console.error("batch write operation failed: ", error);
            toast.error(`${error}`, {
                autoClose: 1000,
            });
        });
}

export const getOrderService = async (userId) => {
    const q = query(
        // collection(db, "productOrders"), where("userId", "==", userId)
        collection(db, "productOrders"), where("userId", "==", userId)
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getAllOrdersService = async () => {
    const q = query(
        collection(db, "productOrders")
    )

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));
}