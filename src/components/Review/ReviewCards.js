import React from 'react'
import Card from 'react-bootstrap/Card';
import StaticStarRating from './StaticStarRating';

const ReviewCards = ({ review }) => {
    const { rating, title, description } = review;
    return (
        <Card style={{ width: '100%' }}>
            <Card.Header style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                <StaticStarRating myProductRating={rating} />
                {/* <div style={{ padding: "10px" }}>
                    <i className="fas fa-user"> Anonymous</i>
                </div> */}
            </Card.Header>
            <Card.Body>
                <Card.Title style={{ paddingLeft: "10px" }}>{title}</Card.Title>
                <Card.Text style={{ paddingLeft: "10px", color: "#35363a" }}>
                    {description}
                </Card.Text>
            </Card.Body>
        </Card >
    )
}

export default ReviewCards;