import { useNavigateCustom } from "./CustomNavigate";
import "./Navbar.css";
import { useState } from "react";
import { HorizontalNav } from "./HorizontalNav";
import { useSelector } from "react-redux";
import { Button, Modal, Box } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaCheck } from "react-icons/fa";
const CLIENT_ID =
  "708505773923-9fuh2eqg0lr8sgl86p7dsuh2v0pjuslt.apps.googleusercontent.com"; // Replace with your Google Cloud Platform project's client ID
const REDIRECT_URI = "http://localhost:3000/auth/google/callback";
export const handleSignIn = async () => {
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

  // Redirect user to Google's authorization endpoint
  window.location.href = authorizationUrl.toString();
};
export const Navbar = ({ details }) => {
  const [menuButton, setMenuButton] = useState(false);
  const { userDetails } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonClicked, setButtonClicked] = useState('');
  const [modalAsk, setModalAsk] = useState(false);

  

  const handleChange = () => {
    setMenuButton(!menuButton);
  };
  const navigate = useNavigateCustom();
  return (
    <div className="navbar-main-container">
      <Modal open={modalOpen} onClose={()=>{setModalOpen(false);setButtonClicked('');}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <div className="modal-container-div modal-container-login">
          <div className="left-login-modal">
            <h3 className="offers">EazzyCollab offers</h3>
            <div className="offers"><FaCheck/>Over 1000+ influencer</div>
            <div className="offers"><FaCheck/>Over 50+ brands</div>
            <div className="offers"><FaCheck/>Smooth payment</div>
          </div>
          <div className="right-login-modal">
            {buttonClicked === 'join' ? (
              <div  id="modal-header">
                <h4>Create a new account</h4>
                <p>Already have an account? <span onClick={() => {setButtonClicked('login')}} id="sign-in-button">Sign in</span></p>
              </div>
            ) : (
              <div  id="modal-header">
                <h4>Sign in to your account</h4>
                <p>Don't have an account? <span onClick={() => {setButtonClicked('join')}} id="sign-in-button">Join</span></p>
              </div>
            )}
            <div id="google-button" onClick={handleSignIn}>
              <FcGoogle size={24}  />
              <p>Contiue with google</p>
            </div>
            <div>
              <p style={{fontSize:'12px', color:'#74767e',letterSpacing:'0.5px'}}>By joining, you agree to the EazzyCollab <a href="#">Terms of Service</a>. Please read our <a href="#">Privacy Policy</a> to learn how we use your personal data.</p>
            </div>
          </div>
        </div>
      </Modal>
      {/* modal for asking who are your brand or influencer */}
      <Modal open={modalAsk}>
        <div className="modal-container-div modal-container-ask">
          <h3>Your account created successfully</h3>
          <h4>Who are you?</h4>
          <div className="who-container">
            <div>
              <h5>Brand</h5>
            </div>
            <div>
              <h5>Influencer</h5>
            </div>
          </div>
          <div>
            <Button variant="outlined">Next</Button>
          </div>
        </div>
      </Modal>
      <div id="navbarcontainer">
        <div id="nameandlogo">EazzyCollab</div>
        <div id="navbardetails">
          <div className="navDetailsClass">
            <span onClick={() => navigate("/")}>Home</span>
          </div>
          <div className="navDetailsClass">
            <span onClick={() => navigate("/how-to-use")}>Explore</span>
          </div>
          {userDetails?.email ? (
            <div
              className="navDetailsClass"
             
              id="account"
            >
              <div id="accountDetails"  onClick={() => navigate("/myAccount")}>
                <img
                  src={`${userDetails.profilePic}`} referrerPolicy= 'no-referrer'
                ></img>
              </div>
            </div>
          ) : (
            <div className="user-input-status">
              <div
                className="navDetailsClass"
                onClick={() => {setModalOpen(true);setButtonClicked('login')}}
                id="login"
              >
                Login
              </div>
              <Button onClick={()=>{setModalOpen(true);setButtonClicked('join')}} id="join-button" variant="outlined">Join</Button>  
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
    </div>
  );
};
