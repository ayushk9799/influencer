import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Pricing } from "./Pricing";
import { HowToUse } from "./HowToUse.js";
import { Home } from "./Home";
import { Login } from "./Login.js";
import { Account } from "./Account.js";
import { ChatBox } from "./ChatBox.js";
import CompleteProfile from "./components/CompleteProfile";
import Profile from "./components/Profile";
import Checkout from "./components/Checkout";
import { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { setUserData } from "./redux/UserSlice.js";
function App() {

const {isAuthenticated}=useSelector(state=>state.user)
  const dispatch = useDispatch();
console.log("home")
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/getMyData", {
        credentials: "include",
      });
      const { userDetails } = await response.json();
      dispatch(setUserData(userDetails));
    } catch (err) {}
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Router>
      <Navbar  />
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/how-to-use" Component={HowToUse}></Route>
        <Route path="/pricing" Component={Pricing}></Route>

        {isAuthenticated ? (
          <Route
            path="/myAccount"
            Component={Account}
           
          ></Route>
        ) : (
          <Route path="/login" Component={Login}></Route>
        )}
        <Route
          path="/influencer/:userID"
          Component={Profile}
         
        ></Route>
        <Route path='/chat/:uniqueID' Component={ChatBox}></Route>
        <Route path="/complete-profile" Component={CompleteProfile} />
        <Route path="/profile"  />
        <Route path="/checkout" Component={Checkout} />
      </Routes>
    </Router>
  );
}

export default App;
