import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useContext, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import userContext from "../utils/userContext";
import { auth } from "../firebase/config/firebase.config";
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

const Login = () => {
    const { user, setUser } = useContext(userContext);
    const { setItem } = useLocalStorage();
    const [modalShow, setModalShow] = useState(false);

    // if (auth != null)
    //     if (auth.currentUser != null)
    //         if (auth.currentUser.uid != null)
    //             console.log("myauth2", auth.currentUser.uid);

    const authentication = (values) => {
        const getAuthentication = getAuth();
        signInWithEmailAndPassword(getAuthentication, values.email, values.password)
            .then((res) => {
                // console.log("login success");
                // console.log("Auth Token", res._tokenResponse.refreshToken);

                let userData = {
                    userId: auth.currentUser.uid,
                    email: values.email
                };

                setItem("user", JSON.stringify(userData));

                setUser({
                    ...user,
                    userId: auth.currentUser.uid,
                    email: values.email
                });
            })
            .catch((error) => {
                // console.log(error.code);
                if (error.code === "auth/wrong-password") {
                    // alert("Please check the password");
                    toast.error("Please check the password", {
                        autoClose: 1000,
                    });
                } else if (error.code === "auth/user-not-found") {
                    // alert("Please check the email");
                    toast.error("Please check the email", {
                        autoClose: 1000,
                    });
                } else if (error.code === "auth/invalid-login-credentials") {
                    // alert("invalid-login-credentials");
                    toast.error("invalid-login-credentials", {
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
                    {/* <h2>Login</h2> */}
                    <Formik
                        validationSchema={schema}
                        onSubmit={authentication}
                        // onSubmit={(e) => {
                        //     const data = { email: e.email, password: e.password };
                        //     alert(JSON.stringify(data));
                        // }}
                        initialValues={{
                            email: 'Test1234@gmail.com',
                            password: 'Test1234',
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
                                    <i className="fas fa-user">Login</i>
                                </ButtonContainer>

                                <ButtonContainer onClick={(e) => {
                                    e.preventDefault();
                                    setModalShow(true);
                                }}>
                                    <i className="fas fa-user">Signup</i>
                                </ButtonContainer>

                                <LoginModal
                                    name="Signup"
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

export default Login;