import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, incrementProduct } from '../utils/cartSlice';
import { handleDetail, openModal } from '../utils/productSlice';
import userContext from "../utils/userContext";
import { toast } from "react-toastify";
import { saveProductIntoCartService, getCartProductsService, incrementCartProductsService, getProductByIdService } from '../firebase/services/cart.service';

const Product = ({ product }) => {
    const { title, img, price, inCart } = product;
    const { user } = useContext(userContext);
    const [CartData, setCartData] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        fetchAddToCartData();
    }, [user.userId]);

    const fetchAddToCartData = async () => {
        if (user.userId) {
            let data = await getCartProductsService(user.userId);
            if (data != undefined) {
                setCartData(data);
            }
        } else {
            console.log("Please login to see past Cart products");
        }
    }

    const addProductIntoCart = async (item) => {
        let iscart = false;
        let productIds = "";
        let Counts = "";
        CartData.map((data) => {
            if (item.id === data.productId) {
                iscart = true;
                productIds = data.id;
                Counts = data.count;
                return true; // Exit the loop early when a match is found  
            }
            return false;
        });
        if (user.userId) {
            if (!iscart) {
                try {
                    let addToCartProductObj = {
                        company: item.company,
                        img: item.img,
                        inCart: true,
                        info: item.info,
                        price: item.price,
                        productId: item.id,
                        userId: user.userId,
                        title: item.title,
                        count: item.count + 1
                    }

                    let docRef = await saveProductIntoCartService(addToCartProductObj);
                    dispatch(addToCart(item));

                    console.log("Document written with ID: ", docRef.id);

                    toast.success(`${item.title} is added to cart`, {
                        autoClose: 1000,
                    });
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            } else {
                try {
                    const addToCartDoc = await getProductByIdService(productIds);
                    await incrementCartProductsService(addToCartDoc, Counts);
                    dispatch(incrementProduct(item))
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
        } else {
            toast.warning(
                `To add your order in cart you need to login first`,
                {
                    autoClose: 1000,
                }
            );
        }

    }

    const openCartModal = (item) => {
        dispatch(openModal(item));
    }

    const handleProductDetails = (item) => {
        dispatch(handleDetail(item))
    }

    return (
        <ProducrWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
            <div className="card">
                <div className="img-container p-5" onClick={() => handleProductDetails(product)}>
                    <Link to="/details">
                        <img src={img} alt="product" className="card-img-top" />
                    </Link>
                    <button data-testid="add-to-cart-button" className="cart-btn" disabled={inCart ? true : false}
                        onClick={() => {
                            addProductIntoCart(product);
                            openCartModal(product);
                        }}>
                        {inCart ? (<p className="text-capitalize mb-0" disabled>{""}in Cart</p>)
                            : (<i className="fas fa-cart-plus" />)}
                    </button>
                </div>

                <div data-testid='product-price' className="card-footer d-flex justify-content-between">
                    <p className="align-self-center mb-0">
                        {title}
                    </p>
                    <h5 className="text-blue font-italic mb-0">
                        <span className="mr-1">$</span>
                        {price}
                    </h5>
                </div>
            </div>
        </ProducrWrapper>
    );
}

// Product.propTypes = {
//     product: PropTypes.shape({
//         id: PropTypes.number,
//         img: PropTypes.string,
//         title: PropTypes.string,
//         price: PropTypes.number,
//         inCart: PropTypes.bool
//     }).isRequired
// }

const ProducrWrapper = styled.div`
.card{
    border-color:tranparent;
    transition:all 1s linear;
}
.card-footer{
    background:transparent;
    border-top:transparent;
    transition:all 1s linear;
}
&:hover{
    .card{
        border:0.04rem solid rgba(0,0,0,0.2);
        box-shadow:2px 2px 5px 0px rgba(0,0,0,0.2);
    }
    .card-footer{
        background:rgba(247,247,247);
    }
}
.img-container{
    position:relative;
    overflow:hidden;
}
.card-img-top{
     transition:all 1s linear;
}
.img-container:hover .card-img-top{
    transform:scale(1.2);
}
.cart-btn{
    position:absolute;
    bottom:0;
    right:0;
    padding:0.2rem 0.4rem;
    background:var(--lightBlue);
    color:var(--mainWhite);
    font-size:1.4rem;
    border-radius:0.5 rem 0 0 0;
    transform:translate(100%, 100%);
    transition:all 1s linear;
}
.img-container:hover .cart-btn{
    transform:translate(0, 0);
}
.cart-btn:hover{
    color:var(--mainBlue);
    cursor:pointer;
}
`;

export default Product;