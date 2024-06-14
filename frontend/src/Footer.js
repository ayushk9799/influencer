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
            <Link to={"#"}>
              <FaInstagram />
            </Link>
            <Link to={"#"}>
              <FaTwitter />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <div id="footer-link-c">
            <Link className="footer-link" to="#">EazzyCollab Privacy Policy</Link>
            <Link className="footer-link" to="#">Terms of Use</Link>
            <Link className="footer-link" to="/faq">FAQs</Link>
          </div>
          <div>© EazzyCollab 2024</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
