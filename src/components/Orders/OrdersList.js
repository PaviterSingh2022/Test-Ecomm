import React from 'react'
import OrdersItem from './OrdersItem';

const Orders = ({ orders }) => {
    return (
        <div className="container-fluid">
            {orders.map(item => {
                return <OrdersItem key={item.id} item={item} />
            })}
            {/* <OrdersItem /> */}
        </div>
    );
}

export default Orders;