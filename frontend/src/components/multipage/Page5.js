import React, { useState } from 'react'
import './page5.css'
import { useSelector, useDispatch } from "react-redux";
import { FaInstagram, FaYoutube} from "react-icons/fa";
import { setCurrentStep, updateFormData } from '../../redux/FormSlice';
import FormHeader from '../subcomponents/FormHeader';

// const socialMedia = {0 : "Instagram", 1 : "Youtube", 2 : "Facebook", 3 : "Twitter"}

const Page5 = () => {
    const {formData, currentStep} = useSelector(state => state.form);
    const [iprice, setIprice] = useState(formData?.iprice || {video : undefined, photo : undefined}); // {video : 123, photo : 3232}
    const [yprice, setYprice] = useState(formData?.yprice || {video : undefined, photo : undefined});
    const dispatch = useDispatch();

    const handleSubmit = () => {
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
        <form onSubmit={handleSubmit}>
            <div className='items'>
                <div className='item-body' style={{display : formData.iaccountID ? 'block' : 'none'}}>
                    <div className='icon-body' >
                        <FaInstagram />
                        <p>Instagram</p>
                    </div>
                    <div className='inpute-items'>
                        <p>Photo</p>
                        <input required placeholder='Price(INR)' value={iprice.photo} onChange={(e) => setIprice({...iprice, ...{photo : e.target.value }})} type='number' />
                    </div>
                    <div className='inpute-items'>
                        <p>{'Video'}</p>
                        <input required placeholder='Price(INR)' value={iprice.video} onChange={(e) => setIprice({...iprice, ...{video : e.target.value }})} type='number'  />
                    </div>
                </div>
                <div className='item-body' style={{display : formData.yaccountID ? 'block' : 'none'}}>
                    <div className='icon-body' >
                        <FaYoutube />
                        <p>Youtube</p>
                    </div>
                    <div className='inpute-items'>
                        <p>Photo</p>
                        <input  required placeholder='Price(INR)' value={yprice.photo} onChange={(e) => setYprice({...yprice, ...{photo : e.target.value }})} type='number' />
                    </div>
                    <div className='inpute-items'>
                        <p>{'Video'}</p>
                        <input  required placeholder='Price(INR)' value={yprice.video} onChange={(e) => setYprice({...yprice, ...{video : e.target.value }})} type='number'  />
                    </div>
                </div>
            </div>
            <div className='button-box'>
                <button className='button-submit' type='submit'  >continue</button>
            </div>
       </form>
    </div>
  )
}

export default Page5