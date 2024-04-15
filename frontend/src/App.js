import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./Navbar";
import {Pricing} from "./Pricing";
import {HowToUse} from './HowToUse.js';
import {Home} from './Home';
import {Login} from './Login.js';
import {Account} from './Account.js';
import {ChatBox} from './ChatBox.js';
import {useState,useEffect} from 'react';
function App() {
const [details,setDetails]=useState({});

const getData= async ()=>
{
  try{
        const response=await fetch('http://localhost:3000/getMyData',{
          credentials: "include",
        });
        const {userDetails}=await response.json();
        setDetails({
          ...details,
          ...userDetails
        })

        }
  catch(err)
  {
    console.log(err);
  }
}
useEffect(()=>
{
getData();
},[])

  return <Router>
    <Navbar details={details}/>
       <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/how-to-use' Component={HowToUse}></Route>
        <Route path='/pricing' Component={Pricing}></Route>

        {details.email ? (
          <Route path="/myAccount" Component={Account}></Route>
        ):(<Route path='/login' Component={Login}></Route>
        )}
        <Route path='/influencer/:userID' Component={ChatBox}></Route>
       </Routes>
  </Router>
   

}

export default App;
