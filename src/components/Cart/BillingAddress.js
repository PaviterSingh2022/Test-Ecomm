import React, { useState,useContext } from 'react';
import { db } from "../../firebase/config/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import userContext from "../../utils/userContext";
import Button from 'react-bootstrap/Button';

const BillingAddressForm = () => {
  const { user } = useContext(userContext);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    address: '11th Street , Palm Olympia',
    address2: 'Boston Road ',
    city: 'New Jersey City',
    state: 'Newyork',
    country: 'USA',
    zipCode: '123456',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    this.setState(() => {
      return { shippingData: [...formData] };
  });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement logic to submit the billing address and potentially handle payment details.
    try {
      if (user.userId) {
        const docRef = await addDoc(collection(db, "shippingAddress"), {
          userId: user.userId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          address2: formData.address2,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zipCode: formData.zipCode,
        });
        console.log("Document written with ID: ", docRef.id);
        toast.success(`Your address updated sucessfully.`, {
          autoClose: 1000,
        });
      }
      else {
        toast.warning(
          `To add your address in shipping address you need to login first.`,
          {
            autoClose: 1000,
          }
        );
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="wrapper">
      <h2>Shipping Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <div className='col-md-3'>
            <label htmlFor="firstName">First Name</label><br></br>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='col-md-3'>
            <label htmlFor="lastName">Last Name</label><br></br>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <div className='col-md-3'>
            <label htmlFor="address">Address 1</label><br></br>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='col-md-3'>
            <label htmlFor="address2">Address 2</label><br></br>
            <input
              type="text"
              id="address2"
              name="address2"
              value={formData.address2}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
        <div className='col-md-3'>
            <label htmlFor="city">City</label><br></br>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='col-md-3'>
            <label htmlFor="state">State</label><br></br>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>         
        </div>
        <div className="mb-3 row">
        <div className='col-md-3'>
            <label htmlFor="state">Country</label><br></br>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </div>     
        <div className='col-md-3'>
            <label htmlFor="zipCode">ZIP Code</label><br></br>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* <div className='col-md-3'>
            <label htmlFor="cardNumber">Credit Card Number</label><br></br>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
            />
          </div>          */}
        </div>
        {/* <div className="mb-3 row">
        <div className='col-md-3'>
            <label htmlFor="expirationDate">Expiration Date</label><br></br>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='col-md-3'>
            <label htmlFor="cvv">CVV</label><br></br>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              required
            />
          </div>
        </div> */}
        <Button variant="primary" type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default BillingAddressForm;
