import React, { useEffect, useState } from 'react';
import Product from "./Product";
import Title from "./Title";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../utils/productSlice';
import { getCategoryService } from '../firebase/services/product.service';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
const ProductList = () => {
    const dispatch = useDispatch();
    const { allproducts } = useSelector((state) => state.allproducts);
    const [dropdown, setDropdown] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        fetchCategorylist();
        dispatch(fetchProducts(''));
    }, []);

    const fetchCategorylist = async () => {
        let data = await getCategoryService();
        if (data != undefined) {
            setDropdown(data);
        }
    }

    const fetchProductCategorylist = (id) => {
        let filterCategoryName = dropdown.filter(x => x.id == id).map(x => x.Category)[0];
        setSelectedValue(filterCategoryName);
        dispatch(fetchProducts(id));
    }

    return (
        <>
            <div className="py-12 mt-2">
                <div className="container">
                    <Dropdown title="All Category" onSelect={(e) => fetchProductCategorylist(e)}>
                        <Dropdown.Toggle  id="dropdown-basic">
                            {selectedValue || 'All Category'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item eventKey="">All Category</Dropdown.Item>
                        {dropdown.map((item) => (
                            <Dropdown.Item eventKey={item.id}>{item.Category}</Dropdown.Item>
                        ))}
                        </Dropdown.Menu>
                        </Dropdown>                        
                  
                    {/* <select className="dropdown" onChange={(e) => fetchProductCategorylist(e.target.value)}>
                        <option value="">All Category</option>
                        {dropdown.map((item) => (
                            <option value={item.id}>{item.Category}</option>
                        ))}
                    </select> */}
                </div>
            </div>
            <div className="py-5">
                <div className="container">
                    <Title name="our" title="products" />
                    <div className="row">
                        {
                            allproducts.map(product => {
                                return <Product key={product.id} product={product} />;
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;

