import React, { useState,useEffect } from "react";
import "./profile.css";
import { BACKEND_URL, formatFollowers, getCategory, s3Domain } from "../assets/Data";
import {  useLocation } from "react-router-dom";
import { FaInstagram, FaYoutube, FaInfoCircle } from "react-icons/fa";
import { useNavigateCustom } from "../CustomNavigate";
import { Button } from "@mui/material";

const Profile = () => {
  const location = useLocation();
  const [item, setItem] = useState(location.state?.account);
  const navigate = useNavigateCustom();
  const [selectIndexInCard, setSelectIndexInCard] = useState({photo : 0, story : 0});

  // for swipe detection
  const [startX, setStartX] = useState(0);
  const [coverIndexMobile, setCoverIndexMobile] = useState(0);

  useEffect(() => {
    const getInfluencersData = async () => {
      if (!item) {
        try {
          const response = await fetch(`${BACKEND_URL}/influencers?uniqueID=${location.state?.uniqueID}`);
          const { data } = await response.json();
          setItem(data);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getInfluencersData();
  }, [item, location.state?.uniqueID]);

  if (!item) {
    return <div>Loading...</div>;
  }

  const {
    _id,
    name,
    bio,
    gallery,
    profilePic,
    field,
    iaccountID,
    ifollowers,
    iprice,
    yaccountID,
    yfollowers,
    yprice,
  } = item;
 

  
  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setStartX(touch.pageX);
  };

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    const dist = touch.pageX - startX;
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

  const handleContinue = (index, type, key, price) => {
      if(index === 4) {
          navigate("/custom-offer", {state : {influencer : _id, profilePic, name}});
      }else {
        let amount, temp = 1;
        if(key === 'story' || key === 'photo') {
          temp = selectIndexInCard[key] + 1;
          amount = price[selectIndexInCard[key]]
        } else {
          amount = price;
        }
        const orderSummary = {
          accountType : type === 0 ? 'instagram' : 'youtube',
          details : `${temp} ${type?'Youtube':'Instagram'} ${key}`,
          orderType : 'main'
        }
          navigate('/user/checkout', {state : {influencer : item, amount, orderSummary}});
      }
  }

  // type={0: 'Instagram', 1:'Youtube'}, data=iprice, yprice
  const priceItem = (data, type) => {
    const elementValue = [];
    if (!data) {
      return;
    }
    for (const key in data) {
      const { price, description } = data[key];
     if(price){
      const element = <div className="price-item-card" key={key}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {!type ? <FaInstagram size={25} /> : <FaYoutube size={25} />}
            <p style={{ fontSize: '20px' }}>{!type ? 'Instagram' : 'Youtube'} {key}</p>
          </div>
          {Array.isArray(price) ? (
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>${price[selectIndexInCard[key]]}</div>
          ) : (
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>${price}</div>
          )}
        </div>
        {Array.isArray(price) ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '18px', letterSpacing: '1px' }}>Quantity</p>
            <div className="item-quantity">
              <div onClick={() => setSelectIndexInCard({ ...selectIndexInCard, [key]: 0 })} style={selectIndexInCard[key] === 0 ? {backgroundColor : '#1976d2', color : 'white', fontWeight : 'bold'} : {}}>1</div>
              <div onClick={() => setSelectIndexInCard({ ...selectIndexInCard, [key]: 1 })} style={selectIndexInCard[key] === 1 ? {backgroundColor : '#1976d2', color : 'white', fontWeight : 'bold'} : {}}>2</div>
              <div onClick={() => setSelectIndexInCard({ ...selectIndexInCard, [key]: 2 })} style={selectIndexInCard[key] === 2 ? {backgroundColor : '#1976d2', color : 'white', fontWeight : 'bold'} : {}}>3</div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '18px', letterSpacing: '1px' }}>Duration</p>
            <div className="item-quantity">Upto 60sec</div>
          </div>
        )}
        <div className="item-description">
          <p>{description}</p>
        </div>
        <Button style={{ width: '100%', textTransform: 'capitalize' }} onClick={() => handleContinue(1, type, key, price)} variant="contained">continue</Button>
      </div>
      elementValue.push(element);
     }
      
    }
    return elementValue
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
                    <img  src={`${profilePic}`} alt='image'  />
                </div>
                
                <div className="profilenames">
                    <div className='name'>{name}</div>
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
                        {iaccountID && <a target='_blank' href={`https://www.instagram.com/${iaccountID}`} className='field-element'><FaInstagram size={18} />{formatFollowers(ifollowers)}</a>}
                        {yaccountID && <a target='_blank' href={`https://www.youtube.com/@${iaccountID}`} className='field-element'><FaYoutube size={20} />{formatFollowers(yfollowers)}</a>}
                    </div>
                </div>
            </div>
            <div className="profile-bio">{bio}</div>
            <div className='price-box'>
                <div className="profile-packages">
                  <p>Packages</p> 
                  <FaInfoCircle />
                </div>
                <div className="price-items-container">
                  {priceItem(iprice, 0)}
                  {priceItem(yprice, 1)}
                </div>
            </div>
            <div className="custom-offer">
              <p>Do you want to send custom offer</p>
              <Button style={{textTransform : 'capitalize'}} onClick={()=>handleContinue(4)} variant="contained">Custom offer</Button>
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
    return <div ></div>;
  }
};
