import React from 'react';

function OrderSummary(props) {
    const { cartItems, subtotal, shippingCost, totalAmount } = props;

    return (
        <div className="order-summary" data-testid="order-summary">
            {/* <h3>Order Summary</h3> */}
            {/* <ul className="order-items">
                {cartItems.map((item, index) => (
                    <li key={index}>
                        <div className="item-name">{item.title}</div>
                        <div className="item-quantity">Quantity: {item.count}</div>
                        <div className="item-price">Price: ${item.price.toFixed(2)}</div>
                    </li>
                ))}
            </ul> */}
            <div className="order-total">
                <div className="subtotal">Subtotal: ${subtotal.toFixed(2)}</div>
                <div className="shipping">Shipping: ${shippingCost.toFixed(2)}</div>
            </div>
            <div>
                <strong>Total Amount: ${totalAmount.toFixed(2)}</strong>
            </div>
        </div>
    );
}

export default OrderSummary;
