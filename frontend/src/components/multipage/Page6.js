import React, { useRef, useState } from 'react'
import "./page6.css"
import { FaInstagram, FaYoutube} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentStep, updateFormData } from '../../redux/FormSlice';
// import FormHeader from '../subcomponents/FormHeader';

const Page6 = () => {
    const {formData, currentStep} = useSelector(state=>state.form);
    const buttonRef = useRef([]);
    const inputRef = useRef([]); // for focusing input when clicked on add
    const alertRef = useRef();
    const [iaccountID, setIaccountID] = useState(formData?.iaccountID || "");
    const [yaccountID, setYaccountID] = useState(formData?.yaccountID || "");
    const dispatch = useDispatch();
    
    const handleAdd = (index) => {
        buttonRef.current[index].style.display = 'none'
        buttonRef.current[index+1].style.display = 'flex'
        inputRef.current[index/2].focus();
        alertRef.current.style.display = 'none'
    }

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
            {/* Instagram */}
            <div onClick={() => {handleAdd(0)}}  >
               <div className='button-main' ref={ref => buttonRef.current[0] = ref} style={{display : !iaccountID ? 'flex' : 'none'}} >
                    <FaInstagram size={25} />   
                    <p>Add Instagram</p>
               </div>
               <div className='button-inputes' ref={ref => buttonRef.current[1] = ref} style={{display : iaccountID ? 'flex' : 'none'}}>
                    <FaInstagram size={25} />
                    <input ref={ref => inputRef.current[0] = ref} placeholder='User id' value={iaccountID} onChange={(e) => setIaccountID(e.target.value)} />
               </div>
            </div>
            {/* Youtube */}
            <div onClick={() => {handleAdd(2)}}>
               <div className='button-main' ref={ref => buttonRef.current[2] = ref} style={{display : !yaccountID ? 'flex' : 'none'}}>
                    <FaYoutube  size={25} />
                    <p>Add Youtube</p>
               </div>
               <div className='button-inputes' ref={ref => buttonRef.current[3] = ref} style={{display : yaccountID ? 'flex' : 'none'}} >
                    <FaYoutube  size={25} />
                    <input ref={ref => inputRef.current[1] = ref} placeholder='User id' value={yaccountID} onChange={(e) => setYaccountID(e.target.value)} />
               </div>
            </div>
        </div>
        <div className='alert-box1' ref={alertRef} >
            <p>Must add at least 1 field.</p>
        </div>
        <button className='button-submit' onClick={handleSubmit}>Continue</button>
    </div>
  )
}

export default Page6