import React from 'react'
import "./howdoeswork.css"
import img1 from '../../assets/HDW/search.jpg'
import img2 from '../../assets/HDW/collab.jpg'
import img3 from '../../assets/HDW/project.jpg'

const HowDoesWork = () => {
  return (
    <div className='hdw-container'>
        <div className='hdw-header'>
            <h3>How EazzyCollab works</h3>
            <p>EazzyCollab provides simple step wise solution for both influencer and brand.</p>
        </div>
        <div className='hdw-main'>
            <div style={{ backgroundImage: `url(${img1})`}}>
                <div className='hdw-child-item'>
                    <h2>1</h2>
                    <h3>Search influencers</h3>
                    <p>Search thousand of well known instgram influencers that match with your requirement</p>
                </div>
            </div>
            <div style={{ backgroundImage: `url(${img2})`}}>
                <div className='hdw-child-item'>
                    <h2>2</h2>
                    <h3>Start collaboration</h3>
                    <p>Onces you send offer to influencer if they accept your offer you can start collaboration. we will securely hold you money until work complete.</p>
                </div>
            </div>
            <div style={{ backgroundImage: `url(${img3})`}}>
                <div className='hdw-child-item'>
                    <h2>3</h2>
                    <h3>Work Review</h3>
                    <p>Onces you approve their work we will initiate payment to influencer</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HowDoesWork