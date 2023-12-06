import React,{ useEffect,useContext } from 'react'
import Title from '../Title';
import OrderSummary from './OrderSummary';
import CheckoutColumns from './CheckoutColumns';
import EmptyCart from './EmptyCart';
import CheckoutList from './CheckoutList';
import CheckoutForm from "./CheckoutForm";
import { useDispatch, useSelector } from 'react-redux';
import userContext from "../../utils/userContext";
import {fetchCartProducts} from '../../utils/cartSlice'
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const Store = ({ history }) => {
    const cartItems = useSelector((store) => store.cart);
    const dispatch = useDispatch();
    const { user } = useContext(userContext);
    const subtotal = cartItems.cart.reduce((total, item) => total + item.price * item.count, 0);
    const shippingCost = 10.0; // Sample shipping cost
    const total = subtotal + shippingCost;

    useEffect(() => {
        dispatch(fetchCartProducts(user.userId));
    }, []);

    return (
        <div className='container'>
            <section>
                {
                    cartItems.cart.length > 0
                        ?
                        <React.Fragment>
                            <Title name="your" title="orderConfirmation" />
                            <Row>
                                <Col>
                                    <CheckoutForm value={cartItems} />
                                </Col>
                                <Col>
                                <h4>Order Summary</h4>
                                <Card style={{ width: '45rem' }}>
                                <Card.Body>
                                    <Card.Title>Item In Your Cart</Card.Title>
                                    <Card.Text>
                                    {/* <OrderSummary cartItems={cartItems.cart} subtotal={subtotal} shippingCost={shippingCost} totalAmount={total} /> */}
                                    <CheckoutColumns />
                                    <CheckoutList value={cartItems} />
                                    <OrderSummary cartItems={cartItems.cart} subtotal={subtotal} shippingCost={shippingCost} totalAmount={total} />
                                    </Card.Text>
                                </Card.Body>
                            </Card>                                   
                                </Col>
                            </Row>
                        </React.Fragment>
                        :
                        <EmptyCart />
                }
            </section>
        </div>
    );
}

export default Store;