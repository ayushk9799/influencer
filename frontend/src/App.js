import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import { Navbar } from "./Navbar";
import  Pricing  from "./Pricing";
import { HowToUse } from "./HowToUse.js";
import { Home } from "./Home";
import { Login } from "./Login.js";
import { Account } from "./Account.js";
import { ChatBox } from "./ChatBox.js";
import CompleteProfile from "./components/CompleteProfile";
import Profile from "./components/Profile";
import Checkout from "./components/Checkout";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./redux/UserSlice.js";
import CustomOffer from "./components/CustomOffer.js";
import PaymentSuccess from "./components/Payment/PaymentSuccess.js";
import PaymentFail from "./components/Payment/PaymentFail.js";
import Order from "./components/Order.js";
import OrderDetails from "./components/OrderDetails.js";
function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log("app")
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/getMyData", {
        credentials: "include",
      });
      const { userDetails } = await response.json();

      if (userDetails) {
        dispatch(setUserData(userDetails));
      }
    } catch (err) {}
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
        <Route path="/pricing" Component={ Pricing} ></Route>

        {isAuthenticated ? (
          <Route path="/myAccount" Component={Account}></Route>
        ) : (
          <Route path="/login" Component={Login}></Route>
        )}
        <Route path="/influencer/:userID" Component={Profile}></Route>
        <Route path="/chat/:uniqueID" Component={ChatBox}></Route>
        <Route path="/complete-profile" Component={CompleteProfile} />
        <Route path="/user/orders" Component={Order} />
        <Route path="/user/orders/:orderID" Component={OrderDetails} />
        <Route path="/user/checkout" Component={Checkout} />
        <Route path="/custom-offer" Component={CustomOffer} />
        <Route path="/payment-success" Component={PaymentSuccess} />
        <Route path="/payment-failed" Component={PaymentFail} />
      </Routes>
    </Router>
  );
}

export default App;
