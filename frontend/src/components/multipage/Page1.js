import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'

import React, { useState } from 'react';
import "./page1.css"
import FormHeader from "../subcomponents/FormHeader";
import { createAccount, updateFormData } from "../../redux/FormSlice";
import {useNavigate} from 'react-router-dom'

const Page1 = () => {
  // State variables for form fields
  const navigate = useNavigate();
  const {formData} = useSelector(state=>state.form);
  const [region, setRegion] = useState(formData?.region || "");
  const [name, setName] = useState(formData?.region || "");
  const [gender, setGender] = useState(formData?.gender || "");
  const [mobileNumber, setMobileNumber] = useState(formData?.mobileNumber || "");
  const [bio, setBio] = useState(formData?.mobileNumber || "");
  const dispatch = useDispatch();


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateFormData({region, gender, mobileNumber, bio, name }))
    dispatch(createAccount());
    // console.log('Form submitted:', { region, gender, mobileNumber, bio });
    navigate('/profile');
    // console.log('sent');
  };

  return (
    <div className="form-container">
      <FormHeader heading={'Enter Your Information'} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="region">Region:</label>
          <input
            type="text"
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option disabled hidden value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="number"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            placeholder='Eg. Fitness content creator & gamer.'
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="button-box">
        <button type="submit" className='button-submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Page1;

