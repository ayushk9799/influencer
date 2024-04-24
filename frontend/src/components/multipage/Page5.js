import React, { useMemo, useState } from 'react'
import './page5.css'
import { useSelector, useDispatch } from "react-redux";
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook  } from "react-icons/fa";
import { setCurrentStep, updateFormData } from '../../redux/FormSlice';
import FormHeader from '../subcomponents/FormHeader';

const socialMedia = {0 : "Instagram", 1 : "Youtube", 2 : "Facebook", 3 : "Twitter"}

const Page5 = () => {
    const {formData, currentStep} = useSelector(state => state.form);
    const [userInputs, setUserInputs] = useState(formData.social);
    const dispatch = useDispatch();

    const keys = useMemo(() => {
        const {social} = formData;
        const arr = [];
        for(let key in social) {
            arr.push(key);
        }
        return arr;
    }, [])


    const getItemsComponents = (val) => {
        const name = socialMedia[val];
        const arr = [<FaInstagram />, <FaYoutube />, <FaFacebook />, <FaTwitter />]
        const handleTextChange = (e, num) => {
            const temp = JSON.parse(JSON.stringify(userInputs));
            if(num === 1) {
                temp[val].price.photo = e.target.value;
            } else {
                temp[val].price.video = e.target.value;
            }
            setUserInputs(temp);
        } 
        return (
            <div className='item-body' key={val}>
                <div className='icon-body' >
                    {arr[val]}
                    <p>{name}</p>
                </div>
                <div className='inpute-items'>
                    <p>Photos</p>
                    <input placeholder='Price(INR)' value={userInputs[val]?.price?.photo} onChange={(e) => handleTextChange(e,1)} type='number' />
                </div>
                <div className='inpute-items'>
                    <p>{val !== 0 ? 'Videos' : 'Reels'}</p>
                    <input placeholder='Price(INR)' value={userInputs[val]?.price?.video} onChange={(e) => handleTextChange(e,2)} type='number'  />
                </div>
            </div>
        )
    }

    const handleSubmit = () => {
        dispatch(updateFormData({'social' : userInputs}));
        dispatch(setCurrentStep(currentStep+1));
    }

  return (
    <div className='container-1'>
        <FormHeader heading={'Add Your content Packages'} />
        <p>Charges are listed on your profile can be purchased by brands. Ensure what to charge <a href='#'>Use our rate Calculator</a>. Colab.com will take 15% fee. </p>
        <div className='items'>
         {keys && keys.map((val) => getItemsComponents(val))}
        </div>
       <button className='button-submit' onClick={handleSubmit}>continue</button>
    </div>
  )
}

export default Page5