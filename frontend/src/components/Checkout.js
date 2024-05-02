import React, { useState } from "react";
// import {useLocation} from 'react-router-dom'
import "./checkout.css";
import { socialMedia } from "../assets/Data";
import WorkingStep from "./subcomponents/WorkingStep";

const Checkout = () => {
  // const location = useLocation();
  const name = "rajiv ranjan"; // taken from user click
  const field = Object.values(socialMedia);
  const [fieldSelected, setFieldSelected] = useState();
  const [summary, setSummary] = useState();
  const [text, setText] = useState();
  const [offerPrice, setOfferPrice] = useState();

  const handleSubmit = () => {
    const data = {
      fieldSelected,
      summary,
      text,
      offerPrice,
    };
  };
  //
  return (
    <div className="container2">
      <h1>Start Collaboration with {name}</h1>
      <div className="checkout-form">
        <select
          value={fieldSelected}
          onChange={(e) => setFieldSelected(e.target.value)}
        >
          <option disabled selected hidden>
            Choose Plateform
          </option>
          {field.map((value, index) => (
            <option value={index} key={index}>
              {value}
            </option>
          ))}
        </select>
        <input
          placeholder="Summarize your colaboration eg: 1 Instagram post"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Eloboarate your colaboration. What the influencer expected to deliver? Eg. 1 Instagram Post to your audiencer"
        />
        <input
          value={offerPrice}
          onChange={(e) => setOfferPrice(e.target.value)}
          placeholder="Colaboration Price (INR)"
          type="number"
        />
        <button className="button-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <WorkingStep />
    </div>
  );
};

export default Checkout;
