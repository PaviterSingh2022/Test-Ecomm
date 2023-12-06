import React from 'react';
import Form from 'react-bootstrap/Form';


const addCategory = () => {


    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Add Category</Form.Label>
                    <Form.Control type="category" placeholder="Add category" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Form>
        </>
    );

}



export default addCategory;