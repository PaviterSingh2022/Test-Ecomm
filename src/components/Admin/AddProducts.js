import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import userContext from '../../utils/userContext';
import { saveProductIntoStoreProductService } from '../../firebase/services/product.service';




function AddProducts() {
    const { user } = useContext(userContext);
    const [selectedOption, setSelectedOption] = useState('option1');

    const [name, setName] = useState({
        category: '',
        categoryId: '',
        company: '',
        count: '',
        img: '',
        inCart: '',
        inWishlist: '',
        info: '',
        price: '',
        title: '',
        total: '',
        userId: user.userId,
        productId:''
    });

    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
      };

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


debugger
        let addToCartProductObj = {
            ...name
        };



        let docRef = await saveProductIntoStoreProductService(addToCartProductObj);



        console.log("Document written with ID: ", docRef.id);



        toast.success('Product added in admin list ', {
            autoClose: 1000,
        });
    }



    return (
        <>
            <Form className='d-grid gap-2' style={{ margin: '15rem' }} onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="dropdown">Select Category</label>
                <select
                    id="dropdown"
                    name="dropdown"
                    value={selectedOption}
                    onChange={handleDropdownChange}
                >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
                <Form.Group className='mb-3' controlId='FormImage'>
                    <Form.Control
                        type='file'
                        name="img"
                        value={name.img}
                        placeholder='Upload image'
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='FormName'>
                    <Form.Control
                        type='text'
                        name="name"
                        value={name.name}
                        placeholder='Enter Product Name'
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='FormPrice'>
                    <Form.Control
                        type='number'
                        name="price"
                        value={name.price}
                        placeholder='Enter product Price'
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='FormQuantity'>
                    <Form.Control
                        type='number'
                        name="quantity"
                        value={name.quantity}
                        placeholder='Enter Quantity of Product'
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='FormDescription'>
                    <Form.Control
                        type='text'
                        name="description"
                        value={name.description}
                        placeholder='Enter Product Description'
                        required
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button type='submit'>Submit</Button>
            </Form>
        </>
    )
}



export default AddProducts;