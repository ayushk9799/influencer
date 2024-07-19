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
            <p>EazzyCollab provides simple step wise solution for both brand and influencer.</p>
        </div>
        <div className='hdw-main'>
            <div style={{ backgroundImage: `url(${img1})`}}>
                <div className='hdw-child-item'>
                    <h2>1</h2>
                    <h3>Discover Your Perfect Match</h3>
                    <p>Explore thousands of top Instagram influencers tailored to your brand's vision.</p>
                </div>
            </div>
            <div style={{ backgroundImage: `url(${img2})`}}>
                <div className='hdw-child-item'>
                    <h2>2</h2>
                    <h3>Spark the Collaboration</h3>
                    <p>Send offers, kickstart projects, and relax. We'll safeguard your investment until the magic happens.</p>
                </div>
            </div>
            <div style={{ backgroundImage: `url(${img3})`}}>
                <div className='hdw-child-item'>
                    <h2>3</h2>
                    <h3>Approve</h3>
                    <p>Love the content? Give the green light, and we'll handle the rest – including influencer payment.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HowDoesWork