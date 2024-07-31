import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BACKEND_URL, formatFollowers, formatNumberIndian, getCategory } from "../assets/Data";
import { Button, Tooltip, IconButton } from "@mui/material";
import WorkingStep from "./subcomponents/WorkingStep";
import { useSelector, useDispatch } from "react-redux";
import { FaQuestionCircle } from "react-icons/fa";
import { getUSDValue } from "../redux/UserSlice";



const Checkout = () => {
  const location = useLocation();
  const { userDetails, USD_Price } = useSelector((state) => state.user);
  const checkoutData = location?.state;
  const { influencer, amount, orderSummary } = checkoutData;
  const [amountINR, setAmountINR] = useState();
  const dispatch = useDispatch();

  const handlePay = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/user/payment/get-key`, {
        credentials: "include",
      });
      const { key } = response.json();
      //creating order
      const response1 = await fetch(
        `${BACKEND_URL}/api/user/payment/checkout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            influencer: influencer._id,
            amount : amountINR,
            orderSummary,
          }),
        }
      );
      const { order } = await response1.json();
      if (order) {
        const options = {
          key,
          amount: order.amount,
          currency: "USD",
          name: "EazzyCollab",
          description: "Payment for influencer",
          image:
            "https://signedayush.s3.ap-south-1.amazonaws.com/8ec68f26-3beb-4b9d-ab37-eca90ddf7f95",
          order_id: order.id,
          callback_url: `${BACKEND_URL}/api/user/payment/payment-verification`,
          prefill: {
            name: userDetails?.name,
            email: userDetails?.email,
            contact: "2302930293",
          },
          notes: {
            address: "gaya",
          },
          theme: {
            color: "#1976d2",
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      } else {
        throw new Error("erro hapepend forrcefully");
      }
    } catch (err) {}
  };

  useEffect(() => {
    if(USD_Price && amount) {
      setAmountINR(Math.round(USD_Price*amount))
    } else {
      dispatch(getUSDValue());
    }
  }, [USD_Price, amount]);

  return (
    <div className="checkout-container-predefined">
      <div className="sub-checkout">
        <div>
          <h4>Checkout</h4>
          <p
            style={{
              fontSize: "16px",
              color: " #1A1A1AB2",
              letterSpacing: "0.7px",
            }}
          >
            Your payment will be held for 48 hours. If Influencer declines the
            offer, the amount will be refunded.
          </p>
        </div>
        <div className="checkout-body">
          <div id="checkout-details">
            <div>
              <h3 style={{ paddingTop: "10px", fontWeight: "300" }}>
                Contact information (email)
              </h3>
              <div id="checkout-email">
                <p>{userDetails?.email}</p>
              </div>
              <div>
                <h3 style={{ paddingTop: "10px", fontWeight: "300" }}>
                  Collaboration offer
                </h3>
                <div id="profile-container-checkout">
                  <div className="checkout-profile">
                    <img src={influencer?.profilePic} alt="images" />
                    <div>
                      <p style={{ fontWeight: "600" }}>{influencer?.name}</p>
                      <p>{orderSummary?.details}</p>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      letterSpacing: "1px",
                    }}
                  >
                    ${amount}
                  </div>
                </div>
              </div>
              <div style={{border : '1px solid #b5b8ba', padding : '7px', textAlign : 'justify'}}>
                <p><span style={{color : 'red'}}>Note :</span> Due to some technical reasons, we are unable to accept international payments at the moment. Therefore, we request you to pay in Indian currency. We are working to fix this issue in a few days.</p>
              </div>
            </div>
          </div>
          <div className="checkout-summary">
            <h2>Summary</h2>
            <div className="checkout-price-container">
              <div>
                <p>Subtotal</p>
                <p>${amount}</p>
              </div>
              <div>
                <p>1 USD Price</p>
                <p>₹{Math.round(USD_Price*100)/100}</p>
              </div>
              <div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "3px" }}
                >
                  <p>Platform fee</p>
                  <Tooltip
                    title="This helps us to operate EazzyCollab."
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -14],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <IconButton>
                      <FaQuestionCircle size={14} />
                    </IconButton>
                  </Tooltip>
                </div>
                <p>$0.0</p>
              </div>
              <div id="line"></div>
              <div style={{ fontWeight: "bold" }}>
                <p>Total</p>
                <p>₹{formatNumberIndian(amountINR)} INR</p>
              </div>
            </div>
            <p style={{ fontSize: "14px", opacity: "0.8" }}>
              By completing your purchase you agree to these{" "}
              <Link to="/terms.html" target="_blank">
                Terms of Service
              </Link>
              .
            </p>
            <Button
              variant="contained"
              className="checkout-button"
              onClick={() => {
                handlePay();
              }}
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
