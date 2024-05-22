import React, { useState } from 'react'
import './page5.css'
import { useSelector, useDispatch } from "react-redux";
import { FaInstagram, FaYoutube} from "react-icons/fa";
import { setCurrentStep, updateFormData } from '../../redux/FormSlice';
import FormHeader from '../subcomponents/FormHeader';

// const socialMedia = {0 : "Instagram", 1 : "Youtube", 2 : "Facebook", 3 : "Twitter"}

const Page5 = () => {
    const {formData, currentStep} = useSelector(state => state.form);
    const [iprice, setIprice] = useState(formData?.iprice || {reels : undefined, story : undefined, photo : undefined}); // {video : 123, photo : 3232}
    const [yprice, setYprice] = useState(formData?.yprice || {shorts : undefined, video : undefined});
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        let temp = {};
        if(formData.iaccountID) {
            temp = {...temp, ...{iprice}};
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
                    <div className='inpute-items'>
                        <p>Story</p>
                        <input  placeholder='Price(INR)' value={iprice.story} onChange={(e) => setIprice({...iprice, ...{story : e.target.value }})} type='number'  />
                    </div>
                    <div className='inpute-items'>
                        <p>Photo</p>
                        <input  placeholder='Price(INR)' value={iprice.photo} onChange={(e) => setIprice({...iprice, ...{photo : e.target.value }})} type='number' />
                    </div>
                    <div className='inpute-items'>
                        <p>Reels</p>
                        <input  placeholder='Price(INR)' value={iprice.reels} onChange={(e) => setIprice({...iprice, ...{reels : e.target.value }})} type='number'  />
                    </div>
                </div>
                <div className='item-body' style={{display : formData.yaccountID ? 'block' : 'none'}}>
                    <div className='icon-body' >
                        <FaYoutube size={30} />
                        <p style={{fontWeight : 'bold', fontSize : '20px', letterSpacing : '0.5px'}}>Youtube</p>
                    </div>
                    <div className='inpute-items'>
                        <p>Shorts</p>
                        <input placeholder='Price(INR)' value={yprice.shorts} onChange={(e) => setYprice({...yprice, ...{shorts : e.target.value }})} type='number' />
                    </div>
                    <div className='inpute-items'>
                        <p>{'Video'}</p>
                        <input placeholder='Price(INR)' value={yprice.video} onChange={(e) => setYprice({...yprice, ...{video : e.target.value }})} type='number'  />
                    </div>
                </div>
            </div>
            <button className='button-submit' onClick={handleSubmit}  >continue</button>
    </div>
  )
}

export default Page5