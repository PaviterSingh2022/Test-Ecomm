import React, { useContext, useEffect, useState } from 'react';
import { collection, doc, where, deleteDoc, query, getDocs } from "firebase/firestore";
import userContext from '../../utils/userContext';
import { db } from '../../config/firebase.config';
import Title from "../Title";
import WishlistColumns from './WishlistColumns';
import EmptyWishlist from './EmptyWishlist';
import FavouriteList from "./FavouriteList";

const ProductWishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useContext(userContext);

    useEffect(() => {
        fetchWishlist();
    }, user.userId);

    const fetchWishlist = async () => {
        if (user.userId) {
            const q = query(
                collection(db, "storeWishlist"), where("userId", "==", user.userId)
            )
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                //     console.log(doc.id, " => ", doc.data());
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setWishlist(newData);
            });
        } else {
            console.log("Please login to see past wishlist");
        }
    }

    const removeWishlist = async (id) => {
        console.log(id, "Id");
        const wishlistDoc = doc(db, "storeWishlist", id);
        await deleteDoc(wishlistDoc);
        alert("Product removed from the wishlist");
        fetchWishlist();
    }

    return (
        <section>
            {
                wishlist.length > 0
                    ?
                    <React.Fragment>
                        <Title name="your" title="wishlist" />
                        <WishlistColumns />
                        <FavouriteList wishlist={wishlist} removeWishlist={removeWishlist} />
                    </React.Fragment>
                    :
                    <EmptyWishlist />
            }
        </section>
    );
}
export default ProductWishlist;