import React,{ useEffect,useContext } from 'react'
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotals from "./CartTotals";
import { useDispatch, useSelector } from 'react-redux';
import userContext from "../../utils/userContext";

import {fetchCartProducts} from '../../utils/cartSlice'




const Store = ({ history }) => {
    const cartItems = useSelector((store) => store.cart);
    const dispatch = useDispatch();
    const { user } = useContext(userContext);

    useEffect(() => {
        dispatch(fetchCartProducts(user.userId));
    }, []);

    return (
        <section>
            {
                cartItems.cart.length > 0
                    ?
                    <React.Fragment>
                        <Title name="your" title="cart" />
                        <CartColumns />
                        <CartList value={cartItems} />
                        <CartTotals value={cartItems} history={history} />
                    </React.Fragment>
                    :
                    <EmptyCart />
            }
        </section>
    );
}

export default Store;