import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import Title from '../Title';
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import { ButtonContainer } from '../Button';
import StarRating from './StarRating';
import { getProductReviewByOrderIdService, saveProductReview } from '../../firebase/services/review.service';
import { toast } from 'react-toastify';
import userContext from '../../utils/userContext';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { storage } from '../../firebase/config/firebase.config';
import { Col, Image, Row } from 'react-bootstrap';

const schema = yup.object().shape({
    title: yup.string()
        .required(),
    description: yup.string()
        .required(),
});

const Review = (props) => {
    let { productId, orderId } = useParams();
    const { user } = useContext(userContext);
    const [productReviewDetails, setProductReviewDetails] = useState({});
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {
        fetchProductReview(orderId);
        fetchImages();
    }, []);

    const handleMediaChange = (e) => {
        debugger
        const file = e.target.files;
        setImageUpload(e.target.files);
        //setProductReviewDetails({ ...productReviewDetails, media: file });
        const files = Array.from(e.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
        //e.target.value = null;
    };

    const handleFileRemove = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };

    const fetchProductReview = async (orderId) => {
        const data = await getProductReviewByOrderIdService(orderId);
        if (data.length > 0) {
            setProductReviewDetails(data[0]);
        }
    }

    const addUpdateProductReview = async (values) => {
        let reviewObj = {
            userId: user.userId,
            orderId: orderId,
            productId: productId,
            reviewDate: Date(),
            title: values.title,
            description: values.description,
            rating: productReviewDetails.rating
        }

        await saveProductReview(reviewObj);

        uploadFile();

        toast.success(`review submitted successfully`, {
            autoClose: 1000,
        });
    }

    const setRating = (rating) => {
        setProductReviewDetails({ rating: rating });
    }

    const imagesListRef = ref(storage, `${orderId}/`);

    const uploadFile = () => {
        if (imageUpload.length == 0) return;
        for (let index = 0; index < imageUpload.length; index++) {
            const imageRef = ref(storage, `${productReviewDetails.orderId}/${imageUpload[index].name}`);
            uploadBytes(imageRef, imageUpload[index])
                .then((snapshot) => {
                    return getDownloadURL(snapshot.ref).catch((error) => {
                        console.error('Error fetching download URL:', error);
                        return null; // Return a default value or handle the error as needed
                    });
                })
                .then((url) => {
                    if (url) {
                        setImageUrls((prev) => [...prev, url]);
                    } else {
                        console.error('URL is undefined or null');
                    }
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                });

        }
    };

    const fetchImages = () => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }

    return (
        <>
            <div className="container">
                <Title name="Ratings & Reviews" />

                <h4>Rate this product</h4>
                <StarRating parentCallback={setRating} myProductRating={productReviewDetails.rating} />
                <hr />

                {
                    productReviewDetails.rating > 0
                        ?
                        <Formik
                            validationSchema={schema}
                            onSubmit={addUpdateProductReview}
                            initialValues={{
                                ...productReviewDetails
                            }}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                isValid,
                                errors,
                            }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Title</Form.Label>

                                        <Form.Control
                                            type="text"
                                            placeholder="Review title..."
                                            name="title"
                                            value={values.title}
                                            onChange={handleChange}
                                            isInvalid={!!errors.title} />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.title}
                                        </Form.Control.Feedback>

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Description</Form.Label>

                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Description..."
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            isInvalid={!!errors.description} />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.description}
                                        </Form.Control.Feedback>

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlFile1">
                                        <Form.Label>Photos</Form.Label>
                                        <Form.Control
                                            type="file"
                                            multiple accept="image/*, video/*"
                                            onChange={handleMediaChange}
                                        // onChange={(event) => {
                                        //     setImageUpload(event.target.files);
                                        // }}
                                        />
                                        {selectedFiles.map((file, index) => (
                                            <div key={index}>
                                                <p>Selected File {index + 1}:</p>
                                                {file.type.startsWith('image/') ? (
                                                    <img src={URL.createObjectURL(file)} alt="Selected" rounded style={{ height: "200px", width: "200px" }} />
                                                ) : file.type.startsWith('video/') ? (
                                                    <video src={URL.createObjectURL(file)} controls rounded style={{ height: "200px", width: "200px" }} />
                                                ) : null}
                                                <button onClick={() => handleFileRemove(index)}>Remove</button>
                                            </div>
                                        ))}
                                    </Form.Group>
                                    <ButtonContainer type="submit" style={{ "float": "right" }}>
                                        <i className="fas fa-user">Submit</i>
                                    </ButtonContainer>
                                    <Row>
                                        <Col xs={6} md={4}>
                                            {
                                                imageUrls.map((url) => {
                                                    return <Image
                                                        src={url}
                                                        rounded style={{ height: "200px", width: "200px" }}
                                                    />
                                                })
                                            }
                                        </Col>
                                    </Row>

                                </Form>
                            )}
                        </Formik >
                        :
                        null
                }

            </div>
        </>
    );
}

export default Review;