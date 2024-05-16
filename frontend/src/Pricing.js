import React from 'react'
import "./pricing.css"
import { FaCheckCircle, FaRegTimesCircle  } from "react-icons/fa";

const Pricing = () => {
  return (
    <div>
       <div className='status-card'>
            <FaCheckCircle className='status-icon' size={25}/>
            <div className='status-bar'><div></div></div>
            <FaCheckCircle className='status-icon' size={25} />
            <div className='status-bar'><div></div></div>
            <FaCheckCircle className='status-icon' size={25}/>
            <div className='status-bar'><div></div></div>
            <FaCheckCircle className='status-icon' size={25} />
        </div>
        <div className='status-container-e'>
            {/* <div className='icon-container'>
                <FaCheckCircle size={25} color='#E9E7E7' />
                
            </div> */}
                  <div className='anim'>
                    <div className='ping1'></div>
                </div>
        </div>
  
    </div>
  )
}

export default Pricing