import React, {useState} from 'react'
import "./checkout.css"
import WorkingStep from './subcomponents/WorkingStep';
import {useNavigate, useLocation} from 'react-router-dom'

const CustomOffer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const targetProfileData = location?.state;
    const [accountType, setAccountType] = useState();
    const [summary, setSummary] = useState("")
    const [details, setDetails] = useState("")
    const [offerPrice, setOfferPrice] = useState();

    const handleSubmit = () => {
      navigate('/user/checkout', {state : {...targetProfileData, amount : offerPrice, orderSummary : {accountType, summary, details, orderType : 'custom'}}})
    }
    console.log(location);
  return (
    <div className='container2'>
      <h1>Send custom offer for collaboration to {targetProfileData?.name}</h1>
      <div className='checkout-form'>
        <select value={accountType} onChange={(e) => setAccountType(e.target.value)} >
          <option disabled selected hidden>Choose Plateform</option>
          <option value={'instagram'} >Instagram</option>
          <option value={'youtube'} >Youtube</option>
        </select>
        <input placeholder='Summarize your colaboration eg: 1 Instagram post' value={summary} onChange={(e)=> setSummary(e.target.value)} />
        <textarea value={details} onChange={(e)=> setDetails(e.target.value)} placeholder='Eloboarate your colaboration. What the influencer expected to deliver? Eg. 1 Instagram Post to your audiencer' />
        <input value={offerPrice} onChange={(e)=> setOfferPrice(e.target.value)}  placeholder='Colaboration Price (USD)' type='number' />
        <button className='button-submit' onClick={handleSubmit}>Submit</button>
      </div>
      <WorkingStep />
    </div>
  );
};

export default CustomOffer;


