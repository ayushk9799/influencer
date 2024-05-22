import React, { useMemo, useState, useEffect } from "react";
import "./profile.css";
import { getCategory, getIcons, s3Domain } from "../assets/Data";
import {  useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { useNavigateCustom } from "../CustomNavigate";

const Profile = () => {
  const location = useLocation();
console.log(location)
  const item = location.state?.account;
 console.log(item)
  const {
    _id,
    name,
    bio,
    gallery,
    profilePic,
    field,
    region,
    iaccountID,
    ifollowers,
    iprice,
    yaccountID,
    yfollowers,
    yprice,
    uniqueID,
  } = item;

  const navigate = useNavigateCustom();

  // for swipe detection
  const [startX, setStartX] = useState(0);
  const [coverIndexMobile, setCoverIndexMobile] = useState(0);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setStartX(touch.pageX);
  };

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    const dist = touch.pageX - startX;
    // setDist(dist);
    if (Math.abs(dist) >= 30) {
      const len = gallery.length;
      if (dist < 0) {
        setCoverIndexMobile((coverIndexMobile + 1) % len);
      } else {
        setCoverIndexMobile(
          coverIndexMobile === 0 ? len - 1 : coverIndexMobile - 1
        );
      }
    }
  };

  const handleChat = () => {
    navigate(`/chat/${uniqueID}`, { state: { account: _id } });
  };

  const handleContinue = (index, productName, amount) => {
      
      if(index === 4) {
          navigate("/custom-offer", {state : {influencer : _id, profilePic, name}});
      }else {
        const orderSummary = {
          accountType : index===0 ? 'instagram' : 'youtube',
          details : productName,
          orderType : 'main'
        }
          navigate('/user/checkout', {state : {influencer : item, amount, orderSummary}});
      }
  }
    
  return (
    <div className='main'>
        {name && (
          <div className='container' >
            {/* cover */}
            {getCoverImageComponents(gallery)}
            <div className='cover-container-mobile' onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <img src={`${s3Domain}/${gallery[coverIndexMobile]}`} />
                <div className='cover-indicator'>{coverIndexMobile+1}/{gallery.length}</div>
            </div>
            {/* profile */}
            <div className='profile-div'>
                <div className='image-div'>
                    <img  src={`${profilePic}`} alt='image' style={{height : '100px', width : '100px'}} />
                </div>
                
                <div>
                    <p className='name'>{name}</p>
                    <div className='category-container'>
                        {
                            field?.length!==0 && field.map((val) => (
                                <div key={val}>
                                    {getCategory(val)}
                                </div>
                            ))
                        }
                    </div>
                    <div className='field-container'>
                        {iaccountID && <a target='_blank' href={`https://www.instagram.com/${iaccountID}`} className='field-element'><FaInstagram size={18} />{ifollowers}</a>}
                        {yaccountID && <a target='_blank' href={`https://www.youtube.com/@${iaccountID}`} className='field-element'><FaYoutube size={20} />{yfollowers}</a>}
                    </div>
                    <div onClick={()=>handleChat()}>Chat</div>
                </div>
            </div>
            <p className="profile-bio">{bio}</p>
            <div className='price-box'>
                <p>Packages</p> 
                {iprice && (
                    <div>
                        <div className='price-items'>
                            <FaInstagram />
                            <p>Instagram post</p>
                            <p>₹{iprice.photo}</p>
                            <button onClick={() => handleContinue(0, "1 Instagram post", iprice.photo)}>Continue</button>
                        </div>
                        <div className='price-items'>
                            <FaInstagram />
                            <p>Instagram Reels</p>
                            <p>₹{iprice.video}</p>
                            <button onClick={() => handleContinue(0, "1 Instagram Reels", iprice.video)}>Continue</button>
                        </div>
                    </div>
                )}
                {yprice && (
                    <div>
                        <div className='price-items'>
                            <FaYoutube />
                            <p>Youtube Short</p>
                            <p>₹{yprice.photo}</p>
                            <button onClick={() => handleContinue(1, "1 Youtube Short", yprice.photo)}>Continue</button>
                        </div>
                        <div className='price-items'>
                            <FaYoutube />
                            <p>Youtube video</p>
                            <p>₹{yprice.video}</p>
                            <button onClick={() => handleContinue(1,"1 Youtube video", yprice.video)}>Continue</button>
                        </div>
                    </div>
                )}
                <div className='price-items'>
                    <p>Do you want to send custom offer</p>
                    <button onClick={() => handleContinue(4, 0)}>Make Custom Offer</button>
                </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default Profile;

const getCoverImageComponents = (coverImage) => {
  const size = coverImage?.length || 0;
  if (size === 1) {
    return (
      <div className="cover-container">
        <img src={`${s3Domain}/${coverImage[0]}`} alt="cover" />
      </div>
    );
  } else if (size === 2) {
    return (
      <div className="cover-container">
        <div>
          <img src={`${s3Domain}/${coverImage[0]}`} alt="cover" />
        </div>
        <div>
          <img src={`${s3Domain}/${coverImage[1]}`} alt="cover" />
        </div>
      </div>
    );
  } else if (size === 3) {
    return (
      <div className="cover-container">
        <div>
          <img src={`${s3Domain}/${coverImage[0]}`} alt="cover" />
        </div>
        <div className="image-three">
          <div>
            <img src={`${s3Domain}/${coverImage[1]}`} alt="cover" />
          </div>
          <div>
            <img src={`${s3Domain}/${coverImage[2]}`} alt="cover" />
          </div>
        </div>
      </div>
    );
  } else if (size === 4) {
    return (
      <div className="cover-container">
        <div>
          <img src={`${s3Domain}/${coverImage[0]}`} alt="cover" />
        </div>
        <div className="image-three">
          <div className="third">
            <img src={`${s3Domain}/${coverImage[1]}`} alt="cover" />
            <img src={`${s3Domain}/${coverImage[2]}`} alt="cover" />
          </div>
          <div>
            <img src={`${s3Domain}/${coverImage[3]}`} alt="cover" />
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="cover-container"></div>;
  }
};
