import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const OrdersItem = ({ item }) => {

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-10 mx-auto">
                    {/* <Link to={`/review/${item.orderId}`} className="order-card"> */}
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col>
                                    <Row>
                                        <Card.Text>
                                            Order Placed
                                        </Card.Text>
                                    </Row>
                                    <Row>
                                        <Card.Text>
                                            {new Date(item.orderDate).toLocaleString()}
                                        </Card.Text>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Card.Text>
                                            Total
                                        </Card.Text>
                                    </Row>
                                    <Row>
                                        <Card.Text>
                                            ${item.total}
                                        </Card.Text>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Card.Text>
                                            Order Id
                                        </Card.Text>
                                    </Row>
                                    <Row>
                                        <Card.Text>
                                            {item.orderId}
                                        </Card.Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Img
                                        variant="top"
                                        style={{ height: 100, width: 100 }}
                                        src={item.image} />
                                </Col>
                                <Col>
                                    <Card.Text>
                                        {item.name}
                                    </Card.Text>
                                    <Link to={`/review/${item.productId}/${item.orderId}`}>
                                        &#9733; Rate and Review Product
                                    </Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    {/* </Link> */}

                    {/* Name: {item.name}<br />
                    Date: {item.orderDate}
                    Invoice No: {item.orderId} */}
                </div>
            </div>
        </div >
    );
}

export default OrdersItem;