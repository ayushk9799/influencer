import React, { useEffect, useRef, useState } from 'react'
import "./page6.css"
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook  } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentStep, updateFormData } from '../../redux/FormSlice';
// import FormHeader from '../subcomponents/FormHeader';

const Page6 = () => {
    const buttonRef = useRef([]);
    const inputRef = useRef([]); // for focusing input when clicked on add
    const alertRef = useRef();
    const [userData, setUserData] = useState({});
    const dispatch = useDispatch();
    const {formData, currentStep} = useSelector(state=>state.form);

    const handleAdd = (index) => {
        buttonRef.current[index].style.display = 'none'
        buttonRef.current[index+1].style.display = 'flex'
        inputRef.current[index/2].focus();
        alertRef.current.style.display = 'none'
    }

    useEffect(() => {
        if(buttonRef.current[0]) {
            const {social} = formData;
            if(social) {
                setUserData(social);
            }
            for(let key in social) {
                handleAdd(key*2);
            }
        }
    }, [buttonRef.current[0]])
    

    const handleTextChange = (value, index) => {
        let temp = JSON.parse(JSON.stringify(userData));
        if(!temp[index]) {
            temp[index] = {followers : undefined, id : undefined, price : {}};
        }
        temp[index].id = value;
        setUserData(temp);
    }

    const handleSubmit = () => {
        if(Object.keys(userData).length === 0) {
            alertRef.current.style.display = 'flex';
            return;
        }
        dispatch(updateFormData({'social' : userData}));
        dispatch(setCurrentStep(currentStep+1));
    }

  return (
    <div className='containerz'>
        {/* <FormHeader heading={'Add Your Social Channel'} /> */}
        <h3>Add Your Social Channel</h3>
        <p>Add your social media account i.e influencer account</p>
        <div className='social-container'>
            {/* Instagram */}
            <div onClick={() => handleAdd(0)}  >
               <div className='button-main' ref={ref => buttonRef.current[0] = ref}>
                    <FaInstagram size={25} />   
                    <p>Add Instagram</p>
               </div>
               <div className='button-inputes' ref={ref => buttonRef.current[1] = ref}>
                <FaInstagram size={25} />
                <input ref={ref => inputRef.current[0] = ref} placeholder='User id' value={userData[0]?.id} onChange={(e) => handleTextChange(e.target.value, 0)} />
               </div>
            </div>
            {/* Youtube */}
            <div onClick={() => handleAdd(2)}>
               <div className='button-main' ref={ref => buttonRef.current[2] = ref}>
                    <FaYoutube  size={25} />
                    <p>Add Youtube</p>
               </div>
               <div className='button-inputes' ref={ref => buttonRef.current[3] = ref}>
                <FaYoutube  size={25} />
                <input ref={ref => inputRef.current[1] = ref} placeholder='User id' value={userData[1]?.id} onChange={(e) => handleTextChange(e.target.value, 1)} />
               </div>
            </div>
            {/* Facebook */}
            <div onClick={() => handleAdd(4)} >
               <div className='button-main' ref={ref => buttonRef.current[4] = ref}>
                    <FaFacebook size={25} />
                    <p>Add Facebook</p>
               </div>
               <div className='button-inputes' ref={ref => buttonRef.current[5] = ref}>
                <FaFacebook size={25} />
                <input ref={ref => inputRef.current[2] = ref} placeholder='User id' value={userData[2]?.id} onChange={(e) => handleTextChange(e.target.value, 2)} />
               </div>
            </div>
            {/* Twitter */}
            <div onClick={() => handleAdd(6)}>
               <div className='button-main' ref={ref => buttonRef.current[6] = ref}>
                    <FaTwitter size={25} />
                    <p>Add Twitter</p>
               </div>
               <div className='button-inputes' ref={ref => buttonRef.current[7] = ref}>
                <FaTwitter size={25} />
                <input ref={ref => inputRef.current[3] = ref} placeholder='User id' value={userData[3]?.id} onChange={(e) => handleTextChange(e.target.value, 3)} />
               </div>
            </div>
        </div>
        <div className='alert-box1' ref={alertRef} >
            <p>Must add at least 1 field.</p>
        </div>
        <button className='button-submit' onClick={() => handleSubmit()}>Continue</button>
    </div>
  )
}

export default Page6