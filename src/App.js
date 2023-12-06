import React, { lazy, useEffect, useState } from 'react';
import { Switch, Route, Routes, Outlet } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/Cart/Cart";
import Default from "./components/Default";
import Modal from './components/Modal';
import Login from './components/Login';
import userContext from './utils/userContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import Orders from './components/Orders/Orders';
import ProductWishlist from './components/Wishlist/ProductWishlist';
import Dashboard from './components/Admin/dashboard';
import { Provider } from 'react-redux';
import store from './utils/store';
import Signup from './components/Signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Review from './components/Review/Review';
import AddProducts from './components/Admin/AddProducts';
import Checkout from "./components/Cart/Checkout";
import EditProducts from './components/Admin/EditProducts';
import BillingAddress from "./components/Cart/BillingAddress";

// const ProductList = lazy(() => import("./components/ProductList"));
// const Details = lazy(() => import("./components/Details"));
// const Cart = lazy(() => import("./components/Cart/Cart"));
// const Login = lazy(() => import("./components/Login"));
// const Orders = lazy(() => import("./components/Orders/Orders"));
// const Signup = lazy(() => import("./components/Signup"));
// const Review = lazy(() => import("./components/Review/Review"));

function App() {
  const [user, setUser] = useState({});
  const { getItem } = useLocalStorage();

  useEffect(() => {
    let getUserData = getItem("user");
    if (user.email == undefined && getUserData != null) {
      let parseUserData = JSON.parse(getUserData);
      if (parseUserData != null) {
        setUser({
          userId: parseUserData.userId,
          email: parseUserData.email
        });
      }
    }
  }, []);

  return (
    <React.Fragment>
      <Provider store={store}>
        <userContext.Provider
          value={{
            user: user,
            setUser: setUser
          }}
        >
          <Navbar />
          <Outlet />

          <Routes>
            <Route exact path="/" element={<ProductList />} />
            <Route path="/details" element={<Details />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<ProductWishlist />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/review/:productId/:orderId" element={<Review />} />
            <Route path="/admin/addproduct" element={<AddProducts />} />
            <Route path="/admin/editproduct/:productId" element={<EditProducts />} />

            <Route exact
              path="/"
              element={
                // <React.Suspense fallback={<>...</>}>
                <ProductList />
                // </React.Suspense>
              }
            />
            <Route
              path="/details"
              element={
                // <React.Suspense fallback={<>...</>}>
                <Details />
                // </React.Suspense>
              }
            />
            <Route
              path="/cart"
              element={
                // <React.Suspense fallback={<>...</>}>
                <Cart />
                // </React.Suspense>
              }
            />
            <Route
              path="/login"
              element={
                // <React.Suspense fallback={<>...</>}>
                <Login />
                // </React.Suspense>
              }
            />
            <Route
              path="/orders"
              element={
                // <React.Suspense fallback={<>...</>}>
                <Orders />
                // </React.Suspense>
              }
            />
            <Route
              path="/wishlist"
              element={
                // <React.Suspense fallback={<>...</>}>
                <ProductWishlist />
                // </React.Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                // <React.Suspense fallback={<>...</>}>
                <Signup />
                // </React.Suspense>
              }
            />
            <Route
              path="/review/:productId/:orderId"
              element={
                // <React.Suspense fallback={<>...</>}>
                <Review />
                // </React.Suspense>
              }
            />
            <Route
              path="/checkout"
              element={
                // <React.Suspense fallback={<>...</>}>
                <Checkout />
                // </React.Suspense>
              }
            />
              <Route
              path="/billingAddress"
              element={
                // <React.Suspense fallback={<>...</>}>
                <BillingAddress />
                // </React.Suspense>
              }
            />
            <Route element={<Default />} />
          </Routes>
          <Modal />
        </userContext.Provider>
      </Provider>
      {/* <ToastContainer position="top-right" /> */}
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
