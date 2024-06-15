import React, { useEffect } from "react";
import "./completeProfile.css";
import NameRegion from "./multipage/NameRegion";
import Categories from "./multipage/Categories";
import Pricing from "./multipage/Pricing";
import SocialAccount from "./multipage/SocialAccount";

import { useSelector, useDispatch } from "react-redux";
import { createAccount, setCurrentStep } from "../redux/FormSlice";
import Gallery from "./multipage/Gallery";

const Home = () => {
  const { currentStep } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const PageDisplay = () => {
    if (currentStep === 1) {
      return <SocialAccount />; // 6
    } else if (currentStep === 2) {
      return <Pricing />;
    } else if (currentStep === 3) {
      return <Categories />;
    } else if (currentStep === 4) {
      return <Gallery />;
    } else if (currentStep === 5) {
      return <NameRegion />;
    }
  };

  const handleBackButton = (event) => {
    event.preventDefault();
    event.returnValue = "Are you sure you want to leave?";
    dispatch(createAccount());
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBackButton);
    return () => {
      window.removeEventListener("beforeunload", handleBackButton);
    };
  });

  return (
    <div className="main-container">
      <div className="content-container">
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${(100 * currentStep) / 5}%` }}
          ></div>
        </div>
        <div>{PageDisplay()}</div>
      </div>
      <div style={{ margin: "5px" }}>
        <button
          disabled={currentStep === 1}
          onClick={() => dispatch(setCurrentStep(currentStep - 1))}
          className="buttonprevnext"
        >
          Prev
        </button>
        <button
          disabled={currentStep === 5}
          onClick={() => dispatch(setCurrentStep(currentStep + 1))}
          className="buttonprevnext"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
