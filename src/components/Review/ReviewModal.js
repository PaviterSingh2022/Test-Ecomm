import React, { useEffect, useState } from 'react'
import { ButtonContainer } from '../Button';
import ReviewCards from './ReviewCards';
import Modal from 'react-bootstrap/Modal';
import { getProductReviewByProductIdService } from '../../firebase/services/review.service';

const ReviewModal = (props) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchProductReviews();
    }, reviews);

    const fetchProductReviews = async () => {
        let data = await getProductReviewByProductIdService(props.productId);
        if (data != undefined)
            setReviews(data);
    }

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    reviews.length > 0
                        ?
                        reviews.map(review => {
                            return <ReviewCards key={review.id} review={review} />;
                        })
                        :
                        "No review has been published yet for the product"
                }
            </Modal.Body>
            <Modal.Footer>
                <ButtonContainer onClick={props.onHide}>
                    <i className="fa fa-close">Close</i>
                </ButtonContainer>
            </Modal.Footer>
        </Modal>
    );
}

export default ReviewModal;
