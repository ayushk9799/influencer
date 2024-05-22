import { useNavigateCustom } from "./CustomNavigate.js";
import "./Navbar.css";
import { useState } from "react";
import { HorizontalNav } from "./HorizontalNav";
import { s3Domain } from "./assets/Data";
import { useSelector } from "react-redux";

export const Navbar = ({ details }) => {
  const [menuButton, setMenuButton] = useState(false);
  const { userDetails } = useSelector((state) => state.user);
  const handleChange = () => {
    setMenuButton(!menuButton);
  };
  const navigate = useNavigateCustom();
  return (
    <>
      <div id="navbarcontainer">
        <div id="nameandlogo">Influencer Chat</div>
        <div id="navbardetails">
          <div className="navDetailsClass">
            <span onClick={() => navigate("/pricing")}>Pricing</span>
          </div>
          <div className="navDetailsClass">
            <span onClick={() => navigate("/how-to-use")}>How to use</span>
          </div>

          {userDetails?.email ? (
            <div
              className="navDetailsClass"
             
              id="account"
            >
              <div id="accountDetails"  onClick={() => navigate("/myAccount")}>
                <img
                  src={`${userDetails.profilePic}`}
                  referrerpolicy="no-referrer"
                ></img>
              </div>
            </div>
          ) : (
            <div
              className="navDetailsClass"
              onClick={() => navigate("/login")}
              id="login"
            >
              Login
            </div>
          )}
          {/* <div className='navDetailsClass' id="signup" onClick={()=>navigate('/signup')}>SignUp</div> */}
        </div>
        <div id="menu" onClick={handleChange}>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            dangerouslySetInnerHTML={{
              __html:
                '<path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />',
            }}
          />
        </div>
      </div>
      <HorizontalNav button={menuButton} />
    </>
  );
};
