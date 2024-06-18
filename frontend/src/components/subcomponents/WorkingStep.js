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
        <p>EazzyCollab provides step wise solution to work with influencer.</p>
        <div className='main'>
            <div className='element'>
                <div className='abc'>
                    <MdAssignmentAdd size={23} color='white'  />
                </div>
                <h5>step 1</h5>
                <h3>Send collaboration Offer</h3>
                <p>Send collaboration offer to influencer. They have 48 hour to accept your offer, otherwise amount will be refunded to your account</p>
            </div>
            <div className='arrow'>
                <ImArrowRight  size={23} />
            </div>
            <div className='element'>
                <div className='abc'>
                    <PiChatTextLight size={23} color='white'  />
                </div>
                <h5>step 2</h5>
                <h3>Chat with influencer</h3>
                <p>Chat with influencer and arrange collaboration. Funds are released to the influencer only after your approval of the the work</p>
            </div>
            <div className='arrow'>
                <ImArrowRight size={23} />
            </div>
            <div className='element'>
                <div className='abc'>
                    <CiStar size={25} color='#f8faf7' />
                </div>
                <h5>step 2</h5>
                <h3>Receive Content</h3>
                <p>Receive your content, review and approve. On your approval the payment will be released to them.</p>
            </div>
        </div>
    </div>
  )
}

export default WorkingStep