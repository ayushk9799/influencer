import React, { useEffect, useRef } from 'react'
import "../multipage/page3.css"
import {IoMdArrowBack} from 'react-icons/io'
import {useDispatch, useSelector} from 'react-redux'
import { setCurrentStep } from '../../redux/FormSlice'

const FormHeader = ({heading}) => {
    const {currentStep} = useSelector(state=>state.form);
    const backButtonRef = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        if(currentStep === 1) {
            backButtonRef.current.style.display = 'none';
        }
    }, [currentStep])
    const handleBack = () => {
        dispatch(setCurrentStep(currentStep-1));
    }
  return (
    <div className="header">
        <div  onClick={handleBack} ref={backButtonRef} className="back-button"><IoMdArrowBack  size={20} /></div>
        <div><h3>{heading}</h3></div>
        <div className='false-div'></div>
  </div>
  )
}

export default FormHeader