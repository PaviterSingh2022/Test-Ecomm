import CartItem from './CartItem';
import userContext from '../../utils/userContext';
import React, { useContext, useEffect, useState } from 'react';
import { getCartProductsService } from '../../firebase/services/cart.service';

export default function CartList({ value }) {
    const { cart } = value;

    const [CartData, setCartData] = useState([]);
    const { user } = useContext(userContext);

    const userId = user && Object.keys(user).length > 0 ? user.userId : null

    useEffect(() => {
        fetchAddToCartData();
    }, [userId]);

    const fetchAddToCartData = async () => {
        if (userId) {
            let data = await getCartProductsService(user.userId);
            if (data != undefined) {
                setCartData(data);
            }
        } else {
            console.log("Please login to see past Cart products");
        }
    }

    return (
        <div className="container-fluid">
            {CartData.map(item => {
                return <CartItem key={item.id} item={item} value={value} fetchAddToCartData={fetchAddToCartData} />
            })}

        </div>
    );
}
