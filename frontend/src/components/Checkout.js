import React from "react";
import { useLocation } from "react-router-dom";
import { BACKEND_URL } from "../assets/Data";

const Checkout = () => {
  const location = useLocation();
  const checkoutData = location?.state?.data;

  const handlePay = async () => {
    try {
      // fetchig razorpay key
      const response = await fetch(`${BACKEND_URL}/user/payment/get-key`, {
        credentials: "include",
      });
      const { key } = response.json();
      //creating order
      const response1 = await fetch(`${BACKEND_URL}/user/payment/checkout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: checkoutData.amount,
          influencer: checkoutData.influencerID,
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
        callback_url: `${BACKEND_URL}/user/payment/payment-verification`,
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
    <div>
      <h4>Checkout</h4>
      <button onClick={handlePay}>Place Order</button>
    </div>
  );
};

export default Checkout;
