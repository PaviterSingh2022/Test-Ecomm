import React, { Component, useContext, useEffect, useState } from 'react';
import userContext from '../../utils/userContext';
import { useDispatch, useSelector } from 'react-redux';
import { removeAll, removeFromWishlist } from '../../utils/wishlistSlice';
import { toast } from "react-toastify";
import { deleteRecordFromFirebaseService } from '../../firebase/services/product.service';
import { getWishlistByIdService } from '../../firebase/services/wishlist.service';

export default function WishlistItem({ item, value, fetchAddToWishlistData, removeWishlist }) {
    const { id, company, title, img, price, } = item;
    const { user } = useContext(userContext);
    const dispatch = useDispatch();

    const removeProductHandler = async (item) => {
        try {
            const addToWishlistDoc = await getWishlistByIdService(item.id);
            await deleteRecordFromFirebaseService(addToWishlistDoc);

            toast.warning(
                `Product removed from the Wishlist`,
                {
                    autoClose: 1000,
                }
            );

            fetchAddToWishlistData();
            dispatch(removeFromWishlist(item));

        }
        catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="row my-2 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img src={img} style={{ width: "5rem", height: "5rem" }} className="img-fluid" alt="product" />
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">company : </span>{company}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">product : </span>{title}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">price : </span>{price}
            </div>
            {/**/}
            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon" onClick={() => removeProductHandler(item)}>
                    <i className="fas fa-trash"></i>
                </div>
            </div>
        </div>
    )
}
