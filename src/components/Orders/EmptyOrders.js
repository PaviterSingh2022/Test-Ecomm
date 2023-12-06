import React from 'react'

const EmptyOrders = () => {
    return (
        <div className="container mt-5" data-testid="empty-orders-container">
            <div className="row" data-testid="empty-orders-row">
                <div className="col-10 mx-auto text-center text-title" data-testid="empty-orders-column">
                    <h1>There is no orders</h1>
                </div>
            </div>
        </div>
    );
}

export default EmptyOrders;