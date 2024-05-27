import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, setCurrentStep, createAccount } from "../../redux/FormSlice";
import "./Page7.css"
import { useNavigateCustom } from "../../CustomNavigate";
import { setUserData } from "../../redux/UserSlice";

export const Page7 = () => {
  const { currentStep } = useSelector((state) => state.form);
  const {userDetails}=useSelector((state)=>state.user)
  const navigate=useNavigateCustom();
  console.log(userDetails)
  const [contentCreator,setContentCreator]=useState(userDetails?.contentCreator===true?'influencer':"brand")
  console.log(contentCreator)
  const dispatch = useDispatch();

  const handleOptionChange = (option) => {
    setContentCreator(option);
    console.log("soprjk jke");
   setContentCreator(option)
   
  };
  const handleSubmit = () => {
    console.log(contentCreator);

    dispatch(updateFormData({ contentCreator: contentCreator==='influencer'?true:false }));
if(contentCreator==="brand")
{
   
    dispatch(createAccount());
    navigate('/myAccount')

}
else{
  dispatch(setCurrentStep(currentStep + 1));
}
};
  return (
    <div className="whoareyou">
    <div className="question">Who are you</div> 
      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="brand"
            checked={contentCreator === "brand"}
            onChange={() => handleOptionChange("brand")}
          />
           <span></span>
          Brand
         
        </label>
      </div>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="influencer"
            checked={contentCreator === "influencer"}
            onChange={() => handleOptionChange("influencer")}
          />
                    <span></span>

          Influencer
        </label>
      </div>
      <button className="button-submit" onClick={() => handleSubmit()}>
        Continue
      </button>
    </div>
  );
};
