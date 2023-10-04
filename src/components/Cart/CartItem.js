import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { incrementProduct, reduceProduct, removeAll, removeFromCart } from '../../utils/cartSlice';

export default function CartItem({ item, value }) {
    const dispatch = useDispatch();
    const { id, title, img, price, total, count, quantity } = item;

    const removeProductHandler = (item) => {
        dispatch(removeFromCart(item));
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
                        <span className="btn btn-black mx-1" onClick={() => dispatch(reduceProduct(item))}>-</span>
                        <span className="btn btn-black mx-1">{quantity}</span>
                        <span className="btn btn-black mx-1" onClick={() => dispatch(incrementProduct(item))}>+</span>
                    </div>
                </div>
            </div>
            {/**/}
            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon" onClick={() => removeProductHandler(item)}>
                    <i className="fas fa-trash"></i>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <strong>item total : $ {price * quantity}</strong>
            </div>
        </div>
    )
}
