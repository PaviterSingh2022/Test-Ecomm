import React from 'react'
import styled from 'styled-components';
import { ButtonContainer } from './Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../utils/productSlice';

const Modal = () => {
    const { modalOpen, modalProduct } = useSelector((state) => state.allproducts);
    const dispatch = useDispatch();

    const closeCartModal = (item) => {
        dispatch(closeModal(item));
    }

    return (
        <>
            {
                !modalOpen
                    ? null
                    :
                    < ModalContainer >
                        <div className="container">
                            <div className="row">
                                <div id="modal" className=
                                    "col-8 mx-auto col-md-6 col-lg-4 text-capitalize text-center p-5">
                                    <h5>item added to the cart</h5>
                                    <img src={modalProduct.img} className="img-fluid" alt="product" />
                                    <h5>{modalProduct.title}</h5>
                                    <h5 className="text-muted">price : $ {modalProduct.price}</h5>
                                    <Link to='/'>
                                        <ButtonContainer onClick={() => closeCartModal()}>
                                            continue shopiing
                                        </ButtonContainer>
                                    </Link>
                                    <Link to='/cart'>
                                        <ButtonContainer cart onClick={() => closeCartModal()}>
                                            go to cart
                                        </ButtonContainer>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ModalContainer>
            }
        </>
    );
}

const ModalContainer = styled.div`
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
background:rgba(0,0,0,0.3);
display:flex;
align-items:center;
justify-content:center;
#modal{
    background:var(--mainWhite);
}
`;

export default Modal;