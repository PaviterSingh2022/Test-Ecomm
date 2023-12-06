import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { db } from "../../firebase/config/firebase.config";
import { Link } from 'react-router-dom';
import userContext from "../../utils/userContext";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { saveCartOrderService } from '../../firebase/services/order.service';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {query,where,getDocs, collection } from "firebase/firestore";

const CheckoutForm = ({ value }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store);
    const { cartSubTotal, cartTax, cartTotal, cart } = value;
    const { user } = useContext(userContext);
    const [shippingAddress, setShippingAddress] = useState([]);
    const address = shippingAddress[0];

    useEffect(() => {
        fetchAddShippingDetails();
    }, [user.userId]);

    const placeProductOrder = async (e) => {
        if (user.userId) {
            const dataArray = [];
            cart.forEach(element => {
                dataArray.push({
                    name: element.company,
                    orderDate: Date(),
                    orderId: uuidv4(),
                    price: element.price,
                    productId: element.productId,
                    quantity: element.count,
                    total: element.price * element.count,
                    userId: user.userId,
                    image: element.img,
                    id: element.id
                })
            });
            await saveCartOrderService(dataArray);
           // clearCart();
           toast.success(`Your order has been successfully placed!`, {
            autoClose: 1000,
        });
        } else {
            toast.warning(
                `To make order you need to login first`,
                {
                    autoClose: 1000,
                }
            );
        }
    }
    
    const fetchAddShippingDetails = async () => {
        if (user.userId) {
            await getDocs(collection(db, "shippingAddress"), where("userId", "==", user.userId))
            .then((querySnapshot) => {
                const shippingAddress = [];
                querySnapshot.forEach((doc) => {
                  shippingAddress.push(doc.data());
                });
              setShippingAddress(shippingAddress);// Update the component's state with the fetched data
              console.log(shippingAddress)
            })
        } else {
            console.log("Please login to see shipping address");
        }
    }

    return (
        <section>
            {
                <div className="container">
                    <>
                        <div className="shipping-info mt-2">
                            <h4>Shipping Info</h4>
                            <Card style={{ width: '20rem' }}>
                                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                <Card.Body>
                                    <Card.Title>Shipping Address :</Card.Title>
                                    <Card.Text>
                                        <div className="billing-info">
                                            {/* {shippingAddress.map((item, index) => (
                                                <p>
                                                    <strong>Name:</strong> {item.firstName}
                                                </p>
                                            ))} */}
                                            <><p>
                                                <strong>Name : </strong> {address ? address.firstName + ' ' + address.lastName : ''}
                                            </p><p>
                                                    <strong>Address 1 : </strong> {address ? address.address : ''}
                                                </p><p>
                                                    <strong>Address 2 : </strong> {address ? address.address2 : ''}
                                                </p><p>
                                                    <strong>City : </strong> {address ? address.city : ''}
                                                </p><p>
                                                    <strong>State : </strong> {address ? address.state : ''}
                                                </p><p>
                                                    <strong>Country : </strong> {address ? address.country : ''}
                                                </p><p>
                                                    <strong>ZipCode : </strong> {address ? address.zipCode : ''}
                                                </p></>
                                        </div>
                                    </Card.Text>
                                    <Link to="/billingAddress">
                                        <Button variant="primary">Add New Address</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="payment-info mt-2">
                            <h4>Payment Info</h4>
                            <Card style={{ width: '20rem' }}>
                                <Card.Body>
                                    <Card.Title>Choose Payment Method :</Card.Title>
                                    <Card.Text>
                                        {['radio'].map((type) => (
                                            <div key={`default-${type}`} className="mb-3">
                                                <Form.Check
                                                    type={type}
                                                    label="Cash On Delivery"
                                                    id={`disabled-default-${type}`}
                                                />
                                                <Form.Check
                                                    disabled
                                                    type={type}
                                                    label="Credit Card"
                                                    id={`disabled-default-${type}`}
                                                />
                                            </div>
                                        ))}
                                    </Card.Text>
                                    <Button variant="primary">Add New Card</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </>
                    <div className="row">
                        <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize">
                            <Link to="/orders">
                                <button
                                    className="btn btn-outline-danger text-uppercase mb-3 px-5"
                                    type="button"
                                    onClick={() => {
                                        placeProductOrder();
                                    }}>
                                    Place Order
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </section>
    );
}
export default CheckoutForm;