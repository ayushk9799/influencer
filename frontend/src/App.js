import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./Navbar";
import { HowToUse } from "./HowToUse.js";
import { Home } from "./Home";
import { Login } from "./Login.js";
import Account from "./Account.js";
import "./App.css"
import { ChatBox } from "./ChatBox.js";
import CompleteProfile from "./components/CompleteProfile";
import Profile from "./components/Profile";
import Checkout from "./components/Checkout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setLoading } from "./redux/UserSlice.js";
import CustomOffer from "./components/CustomOffer.js";
import PaymentSuccess from "./components/Payment/PaymentSuccess.js";
import PaymentFail from "./components/Payment/PaymentFail.js";
import Order from "./components/Order.js";
import OrderDetails from "./components/OrderDetails.js";
import { DisplayData } from "./DisplayData.js";
import FAQ from "./components/FAQ.js";
import SignUp from "./SignUp.js";
import UserType from "./components/multipage/UserType.js";
import { PrivateRoute } from "./PrivateRoute.jsx";
import { BACKEND_URL } from "./assets/Data.js";
import Footer from "./Footer.js";
import { SearchFilter } from "./SearchFilter.js";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/user/getMyData`, {
        credentials: "include",
      });
      const { userDetails } = await response.json();

      if (userDetails) {
        dispatch(setUserData(userDetails));
      }
    } catch (err) {
    } finally {
    }
  };
  useEffect(() => { 
    getData();
  }, []);

  return (
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/how-to-use" Component={HowToUse}></Route>
        {isAuthenticated ? (
          <Route path="/myAccount" Component={Account}></Route>
        ) : (
          <Route path="/login" Component={Login}></Route>
        )}
        <Route path="/sign-up" Component={SignUp}></Route>


        <Route path="/influencer/:userID" Component={Profile}></Route>
        <Route path="/influencer/search" element={<DisplayData/>}></Route>
        <Route path="/chat/:uniqueID" Component={ChatBox}></Route>
        <Route path="/complete-profile" Component={CompleteProfile} />
        <Route path="/complete-profile/:step" Component={UserType} />
        <Route path="/user/orders" Component={Order} />
        <Route path="/user/orders/:orderID" Component={OrderDetails} />
        <Route path="/user/checkout" Component={Checkout} />
        <Route path="/custom-offer" Component={CustomOffer} />
        <Route path="/payment-success" Component={PaymentSuccess} />
        <Route path="/payment-failed" Component={PaymentFail} />

        <Route path="/faq" Component={FAQ} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
