import React, { useRef, useState } from 'react'
import "./page6.css"
import { FaInstagram, FaYoutube} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentStep, updateFormData } from '../../redux/FormSlice';
import {OutlinedInput, InputAdornment, InputLabel, FormControl} from '@mui/material'
// import FormHeader from '../subcomponents/FormHeader';

const Page6 = () => {
    const {currentStep} = useSelector(state=>state.form);
    const {userDetails}=useSelector((state)=>state.user);
    const alertRef = useRef();
    const [iaccountID, setIaccountID] = useState(userDetails?.iaccountID || "");
    const [yaccountID, setYaccountID] = useState(userDetails?.yaccountID || "");
    const dispatch = useDispatch();
    
    const handleSubmit = () => {
        if(!iaccountID && !yaccountID) {
            alertRef.current.style.display = 'flex';
            return;
        }
        let temp = {iaccountID, yaccountID};
        dispatch(updateFormData(temp));
        dispatch(setCurrentStep(currentStep+1));
    }

  return (
    <div className='containerz'>
        <h3>Add Your Social Channel</h3>
        <p>Add your social media account i.e influencer account</p>
        <div className='social-container'>
            <FormControl fullWidth style={{marginBottom:'30px'}} >
                <InputLabel htmlFor="outlined-adornment-amount">Instagram User Id</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={iaccountID}
                    onChange={(e) => setIaccountID(e.target.value)}
                    startAdornment={<InputAdornment position="start"><FaInstagram size={28} /></InputAdornment>}
                    fullWidth
                    placeholder='eg: instagram_01'
                    label='Instagram user id'
                />
            </FormControl>
            <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-youtube">Youtube User Id</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-youtube"
                    value={yaccountID}
                    onChange={(e) => setYaccountID(e.target.value)}
                    startAdornment={<InputAdornment position="start"><FaYoutube size={28} /></InputAdornment>}
                    fullWidth
                    placeholder='eg : @youtube_2'
                    label='Youtube user id'
                />
            </FormControl>
        </div>
        <div className='alert-box1' ref={alertRef} >
            <p>Must add at least 1 field.</p>
        </div>
        <button className='button-submit' onClick={handleSubmit}>Continue</button>
    </div>
  )
}

export default Page6