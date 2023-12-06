import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useContext, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import userContext from "../utils/userContext";
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ButtonContainer } from './Button';
import LoginModal from './LoginModal';
import { toast } from "react-toastify";

const schema = yup.object().shape({
    email: yup.string()
        .email()
        .required(),
    password: yup.string()
        .min(6, 'Must be grater than 6 characters')
        .max(10, 'Must be less than or equal to 10 characters')
        .required(),
});

const Signup = () => {
    const [modalShow, setModalShow] = useState(false);

    const authentication = (values, { resetForm }) => {
        const getAuthentication = getAuth();
        createUserWithEmailAndPassword(getAuthentication, values.email, values.password)
            .then((res) => {
                // alert("Signup successfully");
                toast.success(`Signup successfully`, {
                    autoClose: 1000,
                });
                resetForm();
            })
            .catch((error) => {
                // console.log(error.code);
                if (error.code === "auth/email-already-in-use") {
                    // alert("auth/email-already-in-use");
                    toast.error("auth/email-already-in-use", {
                        autoClose: 1000,
                    });
                }
            });
    }

    return (
        <>
            <Row>
                <Col></Col>
                <Col>
                    <Formik
                        validationSchema={schema}
                        onSubmit={authentication}
                        initialValues={{
                            email: '',
                            password: '',
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
                                <Form.Group controlId="validationFormik01">
                                    <Form.Label>Email</Form.Label>

                                    <Form.Control
                                        type="email"
                                        placeholder="jane@formik.com"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>

                                </Form.Group>

                                <Form.Group controlId="validationFormik02">
                                    <Form.Label>Password</Form.Label>

                                    <Form.Control
                                        type="text"
                                        placeholder="******"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>

                                </Form.Group>

                                {/* <Button
                                    type="submit"
                                    style={{ marginTop: "10px", background: "#fc8019", border: "#fc8019" }}
                                // onClick={() => authentication()}
                                >Login</Button> */}

                                <ButtonContainer type="submit">
                                    <i className="fas fa-user">Signup</i>
                                </ButtonContainer>

                                <ButtonContainer onClick={(e) => {
                                    e.preventDefault();
                                    setModalShow(true);
                                }}>
                                    <i className="fas fa-user">Login</i>
                                </ButtonContainer>

                                <LoginModal
                                    name="Login"
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </Form>
                        )}
                    </Formik >
                </Col>
                <Col></Col>
            </Row>
        </>
    );
}

export default Signup;