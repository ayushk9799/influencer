import React, { useState } from 'react'
import './page5.css'
import { useSelector, useDispatch } from "react-redux";
import { FaInstagram, FaYoutube} from "react-icons/fa";
import { setCurrentStep, updateFormData } from '../../redux/FormSlice';
import FormHeader from '../subcomponents/FormHeader';
import {OutlinedInput, InputAdornment} from '@mui/material'

// const socialMedia = {0 : "Instagram", 1 : "Youtube", 2 : "Facebook", 3 : "Twitter"}

const Page5 = () => {
    const {formData, currentStep} = useSelector(state => state.form);
    const {userDetails}=useSelector((state)=>state.user)
    const [iprice, setIprice] = useState(userDetails?.iprice || {reels : {price:0}, story : {price:0}, photo : {price:0}}); // {video : 123, photo : 3232}
    const [yprice, setYprice] = useState(userDetails?.yprice || {shorts : {price:0}, video : {price:0}});
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        let temp = {};
        if(formData.iaccountID) {
            temp = {...temp, ...{iprice}};
            console.log(temp)
        }
        if(formData.yaccountID) {
            temp = {...temp, ...{yprice}};
        }
        
        dispatch(updateFormData(temp));
        dispatch(setCurrentStep(currentStep+1));
    }

  return (
    <div className='container-1'>
        <FormHeader heading={'Add Your content Packages'} />
        <p>Charges are listed on your profile can be purchased by brands. Ensure what to charge <a href='#'>Use our rate Calculator</a>. Colab.com will take 15% fee. </p>
            <div className='items'>
                <div className='item-body' style={{display : formData.iaccountID ? 'block' : 'none'}}>
                    <div className='icon-body' >
                        <FaInstagram size={30} />
                        <p style={{fontWeight : 'bold', fontSize : '20px', letterSpacing : '0.5px'}}>Instagram</p>
                    </div>
                    {/* <p style={{textAlign:'center'}}>Per field price</p> */}
                    <div className='inpute-items'>
                        <p>Story : </p>
                        {/* <input  placeholder='Price(INR)' value={Array.isArray(iprice.story?.price)?iprice.story.price[0]:iprice.story.price} onChange={(e) => setIprice({...iprice, ...{story : {price:e.target.value} }})} type='number'  /> */}
                        <OutlinedInput
                            placeholder='Amount'
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            style={{width:'150px',height:'30px'}}
                            value={Array.isArray(iprice.story?.price)?iprice.story.price[0]:iprice.story.price} 
                            onChange={(e) => setIprice({...iprice, ...{story : {price:e.target.value} }})}
                            type='number'
                        />
                    </div>
                    <div className='inpute-items'>
                        <p>Photo : </p>
                        {/* <input  placeholder='Price(INR)' value={Array.isArray(iprice.photo?.price)?iprice.photo.price[0]:iprice.photo.price} onChange={(e) => setIprice({...iprice, ...{photo : {price:e.target.value} }})} type='number' /> */}
                        <OutlinedInput
                            placeholder='Amount'
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            style={{width:'150px',height:'30px'}}
                            value={Array.isArray(iprice.photo?.price)?iprice.photo.price[0]:iprice.photo.price} 
                            onChange={(e) => setIprice({...iprice, ...{photo : {price:e.target.value} }})}
                            type='number'
                        />
                    </div>
                    <div className='inpute-items'>
                        <p>Reels : </p>
                        {/* <input  placeholder='Price(INR)' value={iprice.reels?.price} onChange={(e) => setIprice({...iprice, ...{reels :{price: e.target.value} }})} type='number'  /> */}
                        <OutlinedInput
                            placeholder='Amount'
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            style={{width:'150px',height:'30px'}}
                            value={iprice.reels?.price} 
                            onChange={(e) => setIprice({...iprice, ...{reels :{price: e.target.value} }})}
                            type='number'
                        />
                    </div>
                </div>
                <div className='item-body' style={{display : formData.yaccountID ? 'block' : 'none'}}>
                    <div className='icon-body' >
                        <FaYoutube size={30} />
                        <p style={{fontWeight : 'bold', fontSize : '20px', letterSpacing : '0.5px'}}>Youtube</p>
                    </div>
                    <div className='inpute-items'>
                        <p>Shorts : </p>
                        {/* <input placeholder='Price(INR)' value={yprice.shorts?.price} onChange={(e) => setYprice({...yprice, ...{shorts : e.target.value }})} type='number' /> */}
                        <OutlinedInput
                            placeholder='Amount'
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            style={{width:'150px',height:'30px'}}
                            value={yprice.shorts?.price} 
                            onChange={(e) => setYprice({...yprice, ...{shorts : e.target.value }})}
                            type='number'
                        />
                    </div>
                    <div className='inpute-items'>
                        <p>Video : </p>
                        {/* <input placeholder='Price(INR)' value={yprice.video?.price} onChange={(e) => setYprice({...yprice, ...{video : e.target.value }})} type='number'  /> */}
                        <OutlinedInput
                            placeholder='Amount'
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            style={{width:'150px',height:'30px'}}
                            value={yprice.video?.price} 
                            onChange={(e) => setYprice({...yprice, ...{video : e.target.value }})}
                            type='number'
                        />
                    </div>
                </div>
            </div>
            <button className='button-submit' onClick={handleSubmit}  >continue</button>
    </div>
  )
}

export default Page5