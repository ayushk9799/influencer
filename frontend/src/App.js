import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./Navbar";
import {Pricing} from "./Pricing";
import {HowToUse} from './HowToUse.js';
import {Home} from './Home';
import {Login} from './Login.js';
import { SignUp } from "./SignUp.js";
import {ChatBox} from './ChatBox.js'
function App() {



  return <Router>
    <Navbar/>
       <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/how-to-use' Component={HowToUse}></Route>
        <Route path='/pricing' Component={Pricing}></Route>
        <Route path='/login' Component={Login}></Route>
        <Route path='/signup' Component={SignUp}></Route>
        <Route path='/influencer/:userID' Component={ChatBox}></Route>
       </Routes>
  </Router>
   

}

export default App;
