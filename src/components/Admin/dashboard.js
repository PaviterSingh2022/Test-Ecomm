import { Button, button, Table } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { storeProducts } from '../../data.js'
import React, { useContext, useEffect, useState } from 'react'
import userContext from "../../utils/userContext.js";
import { getProductByIdService } from '../../firebase/services/product.service.js';
import { deleteRecordFromFirebaseService, getProductsServiceByUserId } from '../../firebase/services/product.service';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { removeFromCart } from '../../utils/cartSlice';
import AdminColumns from './AdminColumns.js';
import { Link } from 'react-router-dom';

function Dashboard() {
    const { user } = useContext(userContext);
    const dispatch = useDispatch();

    const [CartData, setCartData] = useState([]);
    useEffect(() => {
        fetchStoreProductData();
    }, [user.userId]);

    const fetchStoreProductData = async () => {
        
        if (user.userId) {
            let data = await getProductsServiceByUserId(user.userId);
            if (data != undefined) {
                setCartData(data);
            }
        } else {
            console.log("Please login to see past Cart products");
        }
    }

    const removeProductHandler = async (item) => {

        debugger
        try {
            const deleteStroeProcduct= await getProductByIdService(item.id);
            await deleteRecordFromFirebaseService(deleteStroeProcduct);

            toast.warning(
                `Product removed from the Cart`,
                {
                    autoClose: 1000,
                }
            );

            fetchStoreProductData();
            dispatch(removeFromCart(item));
        }
        catch (e) {
            console.log(e);
        }
    };


    return (
        <>
            <div style={{ margin: "10rem" }}>
                <Table striped bordered hover size='sm'>
                    <AdminColumns />
                    <tbody>
                        {
                            CartData && CartData.length > 0 ?

                                CartData.map((item) => {
                                    return (
                                        <tr>
                                            <td>
                                                {item.title}
                                            </td>
                                            <td>
                                                {/* <div className="col-10 mx-auto col-lg-2"> */}
                                                <img src={item.img} style={{ width: "10rem", height: "10rem" }} className="img-fluid" alt="product" />
                                                {/* </div> */}
                                            </td><td>
                                                {item.title}
                                            </td><td>
                                                {item.price}
                                            </td><td>
                                                {item.count}
                                            </td><td>
                                                {item.info}
                                            </td>
                                            <td>
                                                <Link to={`/admin/editproduct/${item.productId}`}>
                                                    <Button>EDIT</Button>
                                                </Link>
                                                <Button onClick={() => removeProductHandler(item)}>DELETE</Button>
                                            </td>

                                        </tr>
                                    )

                                }) : null
                        }
                    </tbody>
                </Table>
                <br></br>
                <Link className='d-grid gap-2' to='/admin/addproduct'>
                    <Button size="lg">Add Product</Button>
                </Link>
            </div>
        </>
    );

}



export default Dashboard;