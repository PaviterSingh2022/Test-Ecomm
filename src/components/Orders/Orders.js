import React, { useContext, useEffect, useState } from 'react'
import EmptyOrders from "./EmptyOrders";
import OrdersList from "./OrdersList";
import Title from '../Title';
import userContext from '../../utils/userContext';
import { getAllOrdersService, getOrderService } from '../../firebase/services/order.service';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase/config/firebase.config';
import { deleteRecordFromFirebaseService } from '../../firebase/services/product.service';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(userContext);

    useEffect(() => {
        fetchOrders();
    }, user.userId);

    const fetchOrders = async () => {
        if (user.userId) {
            let data = await getOrderService(user.userId);
            if (data != undefined) {
                setOrders(data);
            }
        } else {
            console.log("Please login to see past orders");
        }

        //delete all orders
        // let orders = await getAllOrdersService();
        // orders.forEach((data) => {
        //     const addToCartDoc = doc(db, "productOrders", data.id);
        //     deleteRecordFromFirebaseService(addToCartDoc)
        // });
    }

    return (
        <section>
            {
                orders.length > 0
                    ?
                    <>
                        <Title name="your" title="orders" />
                        <OrdersList orders={orders} />
                    </>
                    :
                    <EmptyOrders />
            }
        </section>

    );
}

export default Orders;