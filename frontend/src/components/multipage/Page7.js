import React, {useState, useRef} from 'react'
import { FaRegCheckCircle  } from "react-icons/fa";
import {Button} from '@mui/material'
import "./Page7.css"
import { useDispatch } from 'react-redux';
import { createAccount, updateFormData } from '../../redux/FormSlice';
import { useNavigateCustom } from "../../CustomNavigate";

const Page7 = () => {
  const [typeOfUserSelect, setTypeOfUserSelect] = useState('');
  const selectedBrandRef = useRef();
  const selectedInfluencerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigateCustom();

  const handleTypeSelect = (type) => {
    setTypeOfUserSelect(type);
    if(type === 'brand') {
      selectedInfluencerRef.current.style.boxShadow = 'none'
      selectedInfluencerRef.current.style.border = '1px solid rgb(204, 201, 201)'
      selectedBrandRef.current.style.boxShadow = 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px'
      selectedBrandRef.current.style.border = '2px solid #1976d2'
    } else {
      selectedBrandRef.current.style.boxShadow = 'none'
      selectedBrandRef.current.style.border = '1px solid rgb(204, 201, 201)'
      selectedInfluencerRef.current.style.boxShadow = ' rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px';
      selectedInfluencerRef.current.style.border = '2px solid #1976d2'
    }
  }

  const handleSubmit = () => {
    dispatch(updateFormData({contentCreator : typeOfUserSelect==='brand'?false:true}));
    if(typeOfUserSelect === 'brand') {
      dispatch(createAccount());
      navigate('/');
    } else {
      navigate('/complete-profile');
    }
  }

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
       <div className="ask-type-container modal-container-ask">
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'5px'}}>
            <FaRegCheckCircle size={22} color="green" />
            <h3>Your account created successfully</h3>
          </div>
          <h4>Who are you?</h4>
          <p>For what purpose you have join EazzyCollab</p>
          <div className="who-container">
            <div onClick={()=>handleTypeSelect('influencer')} ref={selectedInfluencerRef}>
              <h5>Influencer</h5>
              <img src={require('../../assets/content.jpg')} />
              <p style={{fontSize:'12px'}}>looking for brand</p>
            </div>
            <div onClick={()=> handleTypeSelect('brand')} ref={selectedBrandRef}>
              <h5>Brand</h5>
              <img src={require('../../assets/brand.jpg')} />
              <p style={{fontSize:'12px'}}>looking for content creator</p>
            </div>
          </div>
          <div >
            <Button disabled={typeOfUserSelect?.length===0} onClick={handleSubmit} style={{width:'150px',textTransform:'capitalize',fontSize:'16px'}} variant="contained">Next</Button>
          </div>
        </div>
    </div>
  )
}

export default Page7