import { useDispatch, useSelector } from 'react-redux';
import { incrementProduct, reduceProduct, removeAll, removeFromCart } from '../../utils/cartSlice';
import React from 'react';
import { toast } from "react-toastify";
import { deleteRecordFromFirebaseService } from '../../firebase/services/product.service';
import { incrementCartProductsService, decrementCartProductsService, getProductByIdService } from '../../firebase/services/cart.service';

export default function CheckoutItem({ item, value, fetchAddToCartData }) {

    const dispatch = useDispatch();
    const { id, title, img, price, total, count, quantity } = item;

    const removeProductHandler = async (item) => {
        try {
            const addToCartDoc = await getProductByIdService(item.id);
            await deleteRecordFromFirebaseService(addToCartDoc);

            toast.warning(
                `Product removed from the Cart`,
                {
                    autoClose: 1000,
                }
            );

            fetchAddToCartData();
            dispatch(removeFromCart(item));
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
                <span className="d-lg-none">product : </span>{title}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">price : </span>{price}
            </div>
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-2-0">
                <div className="d-flex justify-content-center">
                    <div>
                        {/* <span className="btn btn-black mx-1" onClick={() => decrement(item)}>-</span> */}
                        <span className="btn btn-black mx-1">{count}</span>
                        {/* <span className="btn btn-black mx-1" onClick={() => increment(item)}>+</span> */}
                    </div>
                </div>
            </div>
            {/**/}
            {/* <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon" onClick={() => removeProductHandler(item)}>
                    <i className="fas fa-trash"></i>
                </div>
            </div> */}
            <div className="col-10 mx-auto col-lg-2">
                <strong> $ {price * count}</strong>
            </div>
        </div>
    )
}
