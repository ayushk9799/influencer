import React, { useEffect } from "react";
import "./completeProfile.css";
import Page1 from "./multipage/Page1";
import Page3 from "./multipage/Page3";
import Page4 from "./multipage/Page4";
import Page5 from "./multipage/Page5";
import Page6 from "./multipage/Page6";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentStep } from "../redux/FormSlice";

const Home = () => {
  const {currentStep} = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const PageDisplay = () => {
    if (currentStep === 1) {
      return <Page6 />; // 6
    } else if (currentStep === 2) {
      return <Page5 />;
    } else if (currentStep === 3) {
      return <Page4 />;
    } else if (currentStep === 4) {
      return <Page3 />
    } else if (currentStep === 5) {
      return <Page1 />
    }
  };

  const handleBackButton = (event) => {
    event.preventDefault();
    event.returnValue = 'Are you sure you want to leave?';
  };

  useEffect(() => {
   
    window.addEventListener('beforeunload', handleBackButton);
    return () => {
      window.removeEventListener('beforeunload', handleBackButton);
    }
  })

  return (
    <div className="main-container">
      <div>
        <button
          disabled={currentStep === 1}
          onClick={() => dispatch(setCurrentStep(currentStep - 1))}
        >
          prev
        </button>
        <button
          disabled={currentStep === 5}
          onClick={() => dispatch(setCurrentStep(currentStep + 1))}
        >
          next
        </button>
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${(100 * currentStep) / 5}%` }}
        ></div>
      </div>
      <div className="content-container">{PageDisplay()}</div>
    </div>
  );
};

export default Home;
