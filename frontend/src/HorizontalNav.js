import { Link } from "react-router-dom";
import "./HorizontalNav.css";
import { useSelector } from "react-redux";
export const HorizontalNav = ({ button }) => {

  const {isAuthenticated} =useSelector(state=>state.user)


  const handleLoginOut=async()=>
  {
    
    if(isAuthenticated)
    {
     
          const response=    await fetch('http://localhost:3000/auth/logout')

    }
    else{
           
    }
  }
  if (button === true) {
    return (
      <>
        <div id="horizontalcontainer">
          <Link to={'/myAccount'} className="horizontaldetails">Account</Link>
          <div className="horizontaldetails">Orders</div>
         <div className="horizontaldetails" id={isAuthenticated?"logouth":"loginh"} onClick={handleLoginOut}>{isAuthenticated?"Log Out":"Log In"}</div>
        </div>
      </>
    );
  }
};
