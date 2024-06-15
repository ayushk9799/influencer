import React from "react";
import { useLocation } from "react-router-dom";
import { BACKEND_URL, formatFollowers, getCategory } from "../assets/Data";
import { Button } from "@mui/material";
import WorkingStep from "./subcomponents/WorkingStep";
import { FaYoutube, FaInstagram } from "react-icons/fa";

const Checkout = () => {
  const location = useLocation();
  const checkoutData = location?.state;
  const { influencer, amount, orderSummary } = checkoutData;
  const {
    profilePic,
    iaccountID,
    name,
    field,
    ifollowers,
    yaccountID,
    yfollowers,
    bio,
  } = influencer;
  const handlePay = async () => {
    try {
      // fetchig razorpay key
      const response = await fetch(`${BACKEND_URL}/api/user/payment/get-key`, {
        credentials: "include",
      });
      const { key } = response.json();
      //creating order
      const response1 = await fetch(`${BACKEND_URL}/api/user/payment/checkout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          influencer: influencer._id,
          amount,
          orderSummary,
        }),
      });
      const { order } = await response1.json();

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Thousand ways private limited",
        description: "Payment for influencer",
        image: "https://avatars.githubusercontent.com/u/98911997?v=4",
        order_id: order.id,
        callback_url: `${BACKEND_URL}/api/user/payment/payment-verification`,
        prefill: {
          name: "Rajiv Ranjan",
          email: "rajivranjan0013@gamil.com",
          contact: "2302930293",
        },
        notes: {
          address: "gaya",
        },
        theme: {
          color: "#121212",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {}
  };
  return (
    <div className="checkout-container-predefined">
      <div className="sub-checkout">
        <div style={{ width: "100%" }}>
          <h4>Place offer</h4>
          <p>
            Your payment will be held for 48 hours. If Influencer declines the
            offer, the amount will be refunded.
          </p>
        </div>
        <div className="checkout-body">
          <div className="influencer-profile">
            <div className="profile-div">
              <div className="image-div">
                <img
                  src={profilePic}
                  alt="image"
                  style={{ height: "100px", width: "100px" }}
                />
              </div>
              <div className="detailsContainer">
                <div className="name">{name}</div>
                <div className="category-container">
                  {field?.length !== 0 &&
                    field.map((val) => <div key={val}>{getCategory(val)}</div>)}
                </div>
                <div className="field-container">
                  {iaccountID && (
                    <a
                      target="_blank"
                      href={`https://www.instagram.com/${iaccountID}`}
                      className="field-element"
                    >
                      <FaInstagram size={18} />
                      {formatFollowers(ifollowers)}
                    </a>
                  )}
                  {yaccountID && (
                    <a
                      target="_blank"
                      href={`https://www.youtube.com/@${iaccountID}`}
                      className="field-element"
                    >
                      <FaYoutube size={20} />
                      {formatFollowers(yfollowers)}
                    </a>
                  )}
                </div>
              </div>
            </div>
            <p>{bio}</p>
          </div>
          <div className="checkout-main">
            <div className="checkout-profile">
              <img src={profilePic} alt="images" />
              <p>{orderSummary?.details}</p>
            </div>
            <div className="checkout-price-container">
              <div>
                <p>Subtotal</p>
                <p>${amount}</p>
              </div>
              <div>
                <p>Platform fee</p>
                <p>$0.0</p>
              </div>
              <div style={{ fontWeight: "bold" }}>
                <p>Total</p>
                <p>${amount} USD</p>
              </div>
            </div>
            <Button
              variant="contained"
              className="checkout-button"
              onClick={handlePay}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
      <WorkingStep />
    </div>
  );
};

export default Checkout;
