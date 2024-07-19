import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Home } from "./Home";
import { Login } from "./Login.js";
import Account from "./Account.js";
import CampaignCard from "./Campaign.js";
import DetailedCampaign from "./DetailedCampaign.js";
import {CampaignForm} from "./CampaignForm.js";
import "./App.css"
import { ChatBox } from "./ChatBox.js";
import CompleteProfile from "./components/CompleteProfile";
import Profile from "./components/Profile";
import Checkout from "./components/Checkout";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./redux/UserSlice.js";
import CustomOffer from "./components/CustomOffer.js";
import PaymentSuccess from "./components/Payment/PaymentSuccess.js";
import PaymentFail from "./components/Payment/PaymentFail.js";
import Order from "./components/Order.js";
import OrderDetails from "./components/OrderDetails.js";
import { DisplayData } from "./DisplayData.js";
import FAQ from "./components/FAQ.js";
import UserType from "./components/multipage/UserType.js";
import Footer from "./Footer.js";
import ScrollManager from "./ScrollManager.js";
import Explore from "./Explore.js";
import { CampaignNav } from "./CampaignNav.js";
import MyCampaign from "./MyCampaign.js";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(getUserData());
  }, []);

  return (
    <Router>
      <ScrollRestoration />
      <Navbar />
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/influencers" Component={Explore}></Route>
        {isAuthenticated ? (
          <Route path="/myAccount" Component={Account}></Route>
        ) : (
          <Route path="/login" Component={Login}></Route>
        )}
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
        <Route path ="/campaignFeed" element={<><CampaignNav/><CampaignCard/></>}/>
        <Route path ="/campaigns/:campaignID" Component={DetailedCampaign}/>
        <Route path="/createCampaign" element={<><CampaignNav/><CampaignForm/></>}/>
        <Route path="/myCampaigns" element={<><CampaignNav/><MyCampaign/></>}/>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

const ScrollRestoration = () => {
  ScrollManager();
  return null;
};
