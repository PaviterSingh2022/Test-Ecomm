import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { getCartProductByProductIdService, saveProductIntoCartService } from '../../firebase/services/cart.service';
import { toast } from "react-toastify";
import userContext from '../../utils/userContext';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { getCartProductsService, getProductByIdService } from '../../firebase/services/cart.service.js';
import { useParams } from 'react-router-dom';
import { getProductByProductIdService } from '../../firebase/services/product.service';

const schema = yup.object().shape({
    title: yup.string()
        .required(),
});

function EditProducts() {
    const { user } = useContext(userContext);
    const dispatch = useDispatch();

    const [CartData, setCartData] = useState({});
    let { productId } = useParams();


    useEffect(() => {
        debugger
        fetchStoreProductData();
    }, [user.userId]);

    const [name, setName] = useState({
        category: '',
        img: '',
        name: '',
        price: '',
        quantity: '',
        description: '',
        userId: user.userId
    });

    const fetchStoreProductData = async (item) => {
        debugger
        if (user.userId) {
            let data = await getProductByProductIdService(productId);
            if (data != undefined) {
                setCartData(data[0]);
                debugger
                console.log(data);
            }
        } else {
            console.log("Please login to see past Cart products");
        }
    }
    console.log(CartData);



    const handleInputChange = (e) => {
        const { name, value } = e.target;



        setName((prevName) => ({

            ...prevName,

            [name]: value
        }));
    };




    const handleSubmit = async (e) => {
        debugger
        e.preventDefault();



        let addToCartProductObj = {
            ...name
        };



        let docRef = await saveProductIntoCartService(addToCartProductObj);



        console.log("Document written with ID: ", docRef.id);



        toast.success('Product added in admin list ', {
            autoClose: 1000,
        });
    }



    return (
        <> <Formik
            validationSchema={schema}
            // onSubmit={addUpdateProductReview}
            initialValues={{
                // ...CartData
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
                <Form className='d-grid gap-2' style={{ margin: '15rem' }} onSubmit={(e) => handleSubmit(e)}>
                    {/* <Form.Group className='mb-3' controlId='FormCategory'>
                        <Form.Control
                            type='text'
                            name="category"
                            value={CartData.category}
                            placeholder='Enter category'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormImage'>
                        <Form.Control
                            type='file'
                            name="img"
                            value={CartData.img}
                            placeholder='Upload image'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group> */}
                    <Form.Group className='mb-3' controlId='FormName'>
                        <Form.Control
                            type='text'
                            name="title"
                            value={CartData.title}
                            placeholder='Enter Product Name'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    {/* <Form.Group className='mb-3' controlId='FormPrice'>
                        <Form.Control
                            type='number'
                            name="price"
                            value={CartData.price}
                            placeholder='Enter product Price'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='FormQuantity'>
                        <Form.Control
                            type='number'
                            name="quantity"
                            value={CartData.quantity}
                            placeholder='Enter Quantity of Product'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group> */}
                    <Form.Group className='mb-3' controlId='FormDescription'>
                        <Form.Control
                            type='text'
                            name="info"
                            value={CartData.info}
                            placeholder='Enter Product Description'
                            required
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button type='submit'>Update</Button>
                </Form>
            )}
        </Formik >
        </>
    )
}



export default EditProducts;