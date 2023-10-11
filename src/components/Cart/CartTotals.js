import React, { Component, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import userContext from "../../utils/userContext";
import { collection, addDoc, writeBatch, doc } from "firebase/firestore";
import { db } from '../../config/firebase.config';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { getTotals, removeAll } from '../../utils/cartSlice';
import { toast } from "react-toastify";

export default function CartTotals({ value }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store);

    const { cartSubTotal, cartTax, cartTotal, cart } = value;
    const { user } = useContext(userContext)
    const collectionRef = collection(db, "productOrders");

    const placeProductOrder = async (e) => {
        if (user.userId) {
            const dataArray = [];
            cart.forEach(element => {
                dataArray.push({
                    name: element.company,
                    orderDate: Date(),
                    orderId: uuidv4(),
                    price: element.price,
                    productId: element.id,
                    quantity: element.count,
                    total: element.price * element.count,
                    userId: user.userId,
                    image: element.img
                })
            });

            const batch = writeBatch(db);

            dataArray.forEach((data) => {
                const docref = doc(collectionRef);
                batch.set(docref, data);
            });

            batch
                .commit()
                .then(() => {
                    console.log("batch write operation completed");
                    // alert("order placed successfully");
                    toast.success(`order placed successfully`, {
                        autoClose: 1000,
                    });
                    clearCart();
                })
                .catch((error) => {
                    console.error("batch write operation failed: ", error);
                    // alert(error);
                    toast.error(`${error}`, {
                        autoClose: 1000,
                    });
                });
        } else {
            // alert("To make order you need to login first");
            toast.warning(
                `To make order you need to login first`,
                {
                    autoClose: 1000,
                }
            );
        }
    }

    const clearCart = () => {
        dispatch(removeAll());
    }

    return <React.Fragment>
        <div className="container">
            <div className="row">
                <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                    <button
                        className="btn btn-outline-danger text-uppercase mb-3 px-5"
                        type="button"
                        onClick={() => {
                            clearCart();
                        }}>
                        clear cart
                    </button>
                    <h5>
                        <span className="text-title">subtotal :</span>
                        <strong>{cartItems.cart.subTotal}</strong>
                    </h5>
                    <h5>
                        <span className="text-title">subtotal :</span>
                        <strong>{cartItems.cart.tax}</strong>
                    </h5>
                    <h5>
                        <span className="text-title">subtotal :</span>
                        <strong>{cartItems.cart.total}</strong>
                    </h5>
                </div>
            </div>
            <div className="row">
                <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                    <button
                        className="btn btn-outline-danger text-uppercase mb-3 px-5"
                        type="button"
                        onClick={() => {
                            placeProductOrder();
                        }}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>

    </React.Fragment>;

}
