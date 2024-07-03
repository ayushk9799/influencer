import React from "react";
import "./footer.css";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-top">
          <div id="footer-logo">
            <img
              src={require("./assets/EazzyCollab.svg").default}
              style={{ width: "35px", height: "35px" }}
              alt="logo"
            />
            <p>EazzyCollab</p>
          </div>
          <div id="footer-social">
            <p>Connect with EazzyCollab</p>
            <Link to={"https://www.instagram.com/eazzycollab/"} target="_blank">
              <FaInstagram />
            </Link>
            <Link to={"https://x.com/EazzyCollab"} target="_blank">
              <FaTwitter />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <div id="footer-link-c">
            <a className="footer-link" href="/privacypolicy.html" target="_blank">Privacy Policy</a>
            <Link className="footer-link" to="/terms.html" target="_blank">Terms of Use</Link>
            <Link className="footer-link" to="/contact.html">Contact</Link>
            <Link className="footer-link" to="/aboutus.html" target="_blank">About Us</Link>
            <Link className="footer-link" to="/refund.html" target="_blank">Refund & Cancellation</Link>
          </div>
          
        </div>
        <div>© EazzyCollab 2024</div>
      </div>
    </>
  );
};

export default Footer;
