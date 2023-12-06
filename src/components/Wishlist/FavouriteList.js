import React, { useContext, useEffect, useState } from 'react';
import userContext from '../../utils/userContext';
import WishlistItem from './WishlistItem';
import { getWishlistService } from '../../firebase/services/wishlist.service';

const FavouriteList = ({ wishlist, removeWishlist }) => {
    const [WishlistData, setWishlistData] = useState([]);
    const { user } = useContext(userContext);

    useEffect(() => {
        fetchAddToWishlistData();
    }, user.userId, []);

    const fetchAddToWishlistData = async () => {
        if (user.userId) {
            let data = await getWishlistService(user.userId);
            if (data != undefined) {
                setWishlistData(data);
            }
        } else {
            console.log("Please login to see past Wishlist products");
        }
    }
    return (
        <div className="container-fluid">
            {WishlistData.map(item => {
                return <WishlistItem key={item.id} item={item} wishlist={wishlist} fetchAddToWishlistData={fetchAddToWishlistData} />
            })}
            {/* <WishlistItem /> */}
        </div>
    );
}

export default FavouriteList;