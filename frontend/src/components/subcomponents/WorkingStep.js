import React from 'react'
import './workingStep.css'
import { MdAssignmentAdd } from "react-icons/md";
import { ImArrowRight } from "react-icons/im";
import { CiStar } from "react-icons/ci";
import { PiChatTextLight } from "react-icons/pi";


const WorkingStep = () => {
  return (
    <div className='container1'>
        <h2>How does it work</h2>
        <p>ABCD is provide step wise solution to work with influencer.</p>
        <div className='main'>
            <div className='element'>
                <div className='abc'>
                    <MdAssignmentAdd size={29} color='white'  />
                </div>
                <h5>step 1</h5>
                <h3>Send Offer</h3>
                <p>Send offer details of colaboration. influencer has 48 hour to accept your offer, otherwise amount is refunded to your account</p>
            </div>
            <div className='arrow'>
                <ImArrowRight  size={23} />
            </div>
            <div className='element'>
                <div className='abc'>
                    <PiChatTextLight size={29} color='white'  />
                </div>
                <h5>step 2</h5>
                <h3>Chat with influencer</h3>
                <p>Send offer details of colaboration. influencer has 48 hour to accept your offer, otherwise amount is refunded to your account</p>
            </div>
            <div className='arrow'>
                <ImArrowRight size={23} />
            </div>
            <div className='element'>
                <div className='abc'>
                    <CiStar size={32} color='#f8faf7' />
                </div>
                <h5>step 2</h5>
                <h3>Recieve Content</h3>
                <p>Send offer details of colaboration. influencer has 48 hour to accept your offer, otherwise amount is refunded to your account</p>
            </div>
        </div>
    </div>
  )
}

export default WorkingStep