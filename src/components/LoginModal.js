import Modal from 'react-bootstrap/Modal';
import React from 'react'
import Login from "../components/Login"
import { ButtonContainer } from './Button';
import Signup from './Signup';

const LoginModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.name == "Login" ? <Login /> : <Signup />}
            </Modal.Body>
            <Modal.Footer>
                <ButtonContainer onClick={props.onHide}>
                    <i className="fa fa-close">Close</i>
                </ButtonContainer>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;
