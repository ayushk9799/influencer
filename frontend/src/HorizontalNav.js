import { Link } from "react-router-dom";
import "./HorizontalNav.css";
export const HorizontalNav = ({ button }) => {
  //   let  className=(button)?'slide-left':'slide-right';
  if (button === true) {
    return (
      <>
        <div id="horizontalcontainer">
          <Link to={'/myAccount'} className="horizontaldetails">Account</Link>
          <div className="horizontaldetails">Orders</div>
          <div className="horizontaldetails">Log Out</div>
        </div>
      </>
    );
  }
};
