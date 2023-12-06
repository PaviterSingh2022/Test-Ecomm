import React, { useContext, useEffect, useState } from 'react';
import userContext from '../../utils/userContext';
import Title from "../Title";
import WishlistColumns from './WishlistColumns';
import EmptyWishlist from './EmptyWishlist';
import FavouriteList from "./FavouriteList";
import { fetchWishlistProducts } from '../../utils/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

const ProductWishlist = () => {
    //const [wishlist, setWishlist] = useState([]);
    const { user } = useContext(userContext);
    const wishlistItems = useSelector((store) => store.wishlist);
    //console.log(wishlistItems,'Data')
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchWishlistProducts(user.userId));
    }, [user.userId]);

    // useEffect(() => {
    //     fetchWishlist();
    // }, user.userId);

    // const fetchWishlist = async () => {
    //     if (user.userId) {
    //         const q = query(
    //             collection(db, "storeWishlist"), where("userId", "==", user.userId)
    //         )
    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach((doc) => {
    //             const newData = querySnapshot.docs
    //                 .map((doc) => ({ ...doc.data(), id: doc.id }));
    //             setWishlist(newData);
    //         });
    //     } else {
    //         console.log("Please login to see past wishlist");
    //     }
    // }

    // const removeWishlist = async (id) => {
    //     console.log(id, "Id");
    //     const wishlistDoc = doc(db, "storeWishlist", id);
    //     await deleteDoc(wishlistDoc);
    //     toast.warning(
    //         `Product removed from the wishlist`,
    //         {
    //             autoClose: 1000,
    //         }
    //     );

    // }

    return (
        <section>
            {
                wishlistItems.wishlist.length > 0
                    ?
                    <React.Fragment>
                        <Title name="your" title="wishlist" />
                        <WishlistColumns />
                        <FavouriteList value={wishlistItems} />
                    </React.Fragment>
                    :
                    <EmptyWishlist />
            }
        </section>
    );
}
export default ProductWishlist;