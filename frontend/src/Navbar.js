import { useNavigateCustom } from "./CustomNavigate";
import "./Navbar.css";
import { useState, useRef } from "react";
// import {useLocation} from 'react-router-dom';
import { logout } from "./redux/UserSlice";
import "./HorizontalNav.css";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaCheck } from "react-icons/fa";
import { BACKEND_URL } from "./assets/Data.js";

// import { BACKEND_URL } from "./assets/Data";
// import { updateUserDetails } from "./redux/UserSlice";
const CLIENT_ID =
  "708505773923-9fuh2eqg0lr8sgl86p7dsuh2v0pjuslt.apps.googleusercontent.com"; // Replace with your Google Cloud Platform project's client ID
const REDIRECT_URI = `${BACKEND_URL}/api/auth/google/callback`;

export const Navbar = ({ details }) => {
  const [menuButton, setMenuButton] = useState(false);
  const { userDetails } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonClicked, setButtonClicked] = useState("");
  // const [modalAsk, setModalAsk] = useState(false);
  // const [typeOfUserSelect, setTypeOfUserSelect] = useState('');
  // const selectedBrandRef = useRef();
  // const selectedInfluencerRef = useRef();
  // const dispatch = useDispatch();
  // const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.user);
  //
  const navigate = useNavigateCustom();
  const dispatch = useDispatch();
  const horizontalRef = useRef(null);
  const handleAccountClick = () => {
    navigate("/myAccount");
    horizontalRef.current.style.display = "none";
    setMenuButton(!menuButton);
  };
  const handleOrdersClick = () => {
    navigate("/user/orders");
    horizontalRef.current.style.display = "none";
    setMenuButton(!menuButton);
  };
  const handleLoginOut = async () => {
    if (isAuthenticated) {
      const response = await fetch(`${BACKEND_URL}/api/auth/logout`, {
        credentials: "include",
      });

      if (response.ok) {
        dispatch(logout());
        navigate("/");
      }
    } else {
    }
    navigate("/");
    horizontalRef.current.style.display = "none";
    setMenuButton(!menuButton);
  };

  const handleSignIn = async () => {
    // Create authorization code flow URL
    const authorizationUrl = new URL(
      "https://accounts.google.com/o/oauth2/v2/auth"
    );
    authorizationUrl.searchParams.set("client_id", CLIENT_ID);
    authorizationUrl.searchParams.set("redirect_uri", REDIRECT_URI);
    authorizationUrl.searchParams.set("scope", "profile email");
    authorizationUrl.searchParams.set("response_type", "code");
    authorizationUrl.searchParams.set("access_type", "offline");
    authorizationUrl.searchParams.set("prompt", "consent");

    window.location.href = authorizationUrl.toString();
  };


  const handleChange = () => {
    setMenuButton(!menuButton);
  };
  return (
    <div className="navbar-main-container">
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setButtonClicked("");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-container-div modal-container-login">
          <div className="left-login-modal">
            <h3 className="offers">EazzyCollab offers</h3>
            <div className="offers">
              <FaCheck />
              Over 1000+ influencer
            </div>
            <div className="offers">
              <FaCheck />
              Over 50+ brands
            </div>
            <div className="offers">
              <FaCheck />
              Smooth payment
            </div>
          </div>
          <div className="right-login-modal">
            {buttonClicked === "join" ? (
              <div id="modal-header">
                <h4>Create a new account</h4>
                <p>
                  Already have an account?{" "}
                  <span
                    onClick={() => {
                      setButtonClicked("login");
                    }}
                    id="sign-in-button"
                  >
                    Sign in
                  </span>
                </p>
              </div>
            ) : (
              <div id="modal-header">
                <h4>Sign in to your account</h4>
                <p>
                  Don't have an account?{" "}
                  <span
                    onClick={() => {
                      setButtonClicked("join");
                    }}
                    id="sign-in-button"
                  >
                    Join
                  </span>
                </p>
              </div>
            )}
            <div id="google-button" onClick={handleSignIn}>
              <FcGoogle size={24} />
              <p>Contiue with google</p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#74767e",
                  letterSpacing: "0.5px",
                }}
              >
                By joining, you agree to the EazzyCollab{" "}
                <a href="/privacypolicy.html" target="_blank">Terms of Service</a>. Please read our{" "}
                <a href="/terms.html" target="_blank">Privacy Policy</a> to learn how we use your personal
                data.
              </p>
            </div>
          </div>
        </div>
      </Modal>
     
      <div id="navbarcontainer">
        <div id="nameandlogo">EazzyCollab</div>
        <div id="navbardetails">
          <div className={isAuthenticated ? "navDetailsClass" : "unauth"}>
            <span onClick={() => navigate("/")}>Home</span>
          </div>
          <div className={isAuthenticated ? "navDetailsClass" : "unauth"}>
            <span onClick={() => navigate("/influencers")}>Explore</span>
          </div>
          {userDetails?.email ? (
            <div
              className={isAuthenticated ? "navDetailsClass" : "unauth"}
              id="account"
            >
              <div id="accountDetails" onClick={handleChange}>
                <img
                  src={`${userDetails.profilePic}`}
                  referrerPolicy="no-referrer"
                ></img>
              </div>
            </div>
          ) : (
            <div className="user-input-status">
              <div
                className={isAuthenticated ? "navDetailsClass" : "unauth"}
                onClick={() => {
                  setModalOpen(true);
                  setButtonClicked("login");
                }}
                id="login"
              >
                Login
              </div>
              <Button
                onClick={() => {
                  setModalOpen(true);
                  setButtonClicked("join");
                }}
                id="join-button"
                variant="outlined"
              >
                Join
              </Button>
            </div>
          )}
          {/* <div className='navDetailsClass' id="signup" onClick={()=>navigate('/signup')}>SignUp</div> */}
        </div>
        <div id="menu" onClick={handleChange}>
          {
            isAuthenticated? <div id="menubutton" >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              dangerouslySetInnerHTML={{
                __html:
                  '<path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />',
              }}
            />
            </div>:  <div id="loginsmallscreen" >
          <div
                className={isAuthenticated ? "navDetailsClass" : "unauth"}
                onClick={(event) => {
                  event.stopPropagation();
                  setModalOpen(true);
                  setButtonClicked("login");
                }}
                id="login"

              >
                Login
              </div>
          </div>
          }
        
         
         
        </div>
      </div>
      {/* <HorizontalNav button={menuButton} /> */}

      {menuButton ? (
        <div id="horizontalcontainer" ref={horizontalRef}>
          <div className="horizontaldetails" onClick={handleAccountClick}>
            Account
          </div>
          <div className="horizontaldetails" onClick={handleOrdersClick}>
            Orders
          </div>
          <div
            className="horizontaldetails"
            id={isAuthenticated ? "logouth" : "loginh"}
            onClick={handleLoginOut}
          >
            {isAuthenticated ? "Log Out" : "Log In"}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
