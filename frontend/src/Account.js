import React, { useState, useEffect } from "react";
import "./components/profile.css";
import { BACKEND_URL, getCategory } from "./assets/Data";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaInstagram, FaYoutube, FaInfoCircle } from "react-icons/fa";
import { updateFormData } from "./redux/FormSlice";
import { IoMdClose } from "react-icons/io";
import { Button, Modal, Box, Alert } from "@mui/material";
import { updateUserDetails } from "./redux/UserSlice";

// this link is for test purpose
const s3Domain = 'https://thousand-ways.s3.ap-south-1.amazonaws.com'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 3,
};

const Account = () => {
  const {userDetails} = useSelector(state=>state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
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
    gender,
    mobileNumber,
  } = userDetails;

  const [selectIndexInCard, setSelectIndexInCard] = useState({photo : 0, story : 0});
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [description, setDescription] = useState('')
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

  const handleEditProfile = () => {
    let iValue,yValue;
    if(iprice) {
      iValue = {story : iprice.story?.price[0], photo : iprice.photo?.price[0], reels : iprice.reels?.price};
    }
    if(yprice) {
      yValue = {shorts : yprice.shorts?.price, video : yprice.video?.price}
    }
    const temp = { name, bio, gallery, profilePic, field, region, iaccountID, ifollowers, iprice : iValue, yaccountID, gender, mobileNumber, yprice : yValue};
    dispatch(updateFormData(temp));
    navigate('/complete-profile');
  }

  const handleEditPriceCardDetails = (type, key, data) => {
    setOpenModal(true);
    setDescription(data?.description);
    const temp = type ? 'Instagram':'Youtube';
    setModalData({key, type : temp, price : data?.price});
    // console.log('clicked', type, key, data);
  }

  const handleSubmitButton = async() => {
    try {
      const response = await fetch(`${BACKEND_URL}/addData/update-price`, {
        method : 'POST',
        credentials : 'include',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ description, ...modalData})
      })
      const abc = await response.json();
      const data = abc.data;
      if(response.status === 200) {
        if(modalData.type === 'Instagram') {
          dispatch(updateUserDetails({iprice : data}))
        } else {
          dispatch(updateUserDetails({yprice : data}));
        }
      }
      setOpenModal(false);
    } catch (err) {
      console.log('error', err);
    }

  }

  const priceItem = (data, type) => {
    const elementValue = [];
    if (!data) {
      return;
    }
    for (const key in data) {
      const { price, description } = data[key];
      const element = <div className="price-item-card" key={key}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {type ? <FaInstagram size={25} /> : <FaYoutube size={25} />}
            <p style={{ fontSize: '20px' }}>{type ? 'Instagram' : 'Youtube'} {key}</p>
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
        <div style={{ opacity: 0.9, textAlign: 'justify' }}>{description}</div>
        <Button style={{ width: '100%', textTransform: 'capitalize' }} onClick={() => handleEditPriceCardDetails(type, key, data[key])} variant="contained">Edit</Button>
      </div>
      elementValue.push(element);
    }
    return elementValue
  }
    
  return (
    <div className='profile-main'>
        {name && (
          <div className='container' >
            <Modal open={openModal} onClose={() => {setOpenModal(false)}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={{ ...style, width: 400 }}>
                  <div style={{display:'flex',justifyContent:'space-between', marginBottom : '0px'}}>
                    <h2 id="child-modal-title">{`${modalData?.type} ${modalData?.key}`}</h2>
                    <IoMdClose size={25} onClick={() => setOpenModal(false)} className="modal-close-button" />
                  </div>
                  <p id="child-modal-description">We suggest you to change time to time your collaboration fee.</p>
                  {modalData?.key === 'photo' || modalData?.key === 'story' ? (
                    <div style={{width : '100%', marginTop : '5px'}}>
                      <div style={{display : 'flex', justifyContent : 'space-between'}}>
                        <h4>Price:</h4>
                        <div className="multiple-inputs">
                          <input type="Number" placeholder="Price" value={modalData.price[0]} onChange={(e) => {
                            const newPrice = [...modalData.price]; // Create a copy of the price array
                            newPrice[0] = Number(e.target.value); // Update the value in the copied array
                            setModalData({ ...modalData, price: newPrice }); // Set the new modalData object with the updated data
                          }} />
                          <input type="Number" placeholder="Price" value={modalData.price[1]} onChange={(e) => {
                            const newPrice = [...modalData.price];
                            newPrice[1] = Number(e.target.value);
                            setModalData({ ...modalData, price: newPrice });
                          }} />
                          <input type="Number" placeholder="Price" value={modalData.price[2]} onChange={(e) => {
                            const newPrice = [...modalData.price];
                            newPrice[2] = Number(e.target.value);
                            setModalData({ ...modalData, price: newPrice });
                          }} />
                        </div>
                      </div>
                      <div style={{display : 'flex', justifyContent : 'space-between'}}>
                        <h4>Quantity:</h4>
                        <div className="multiple-inputs">
                          <div placeholder="Price">1</div>
                          <div placeholder="Price">2</div>
                          <div placeholder="Price">3</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{display : 'flex', justifyContent : 'space-between', margin: '5px 0px', alignItems : 'center'}}>
                      <h4>Price:</h4>
                      <input value={modalData.price} onChange={(e) =>  {setModalData({...modalData, price : e.target.value})}} style={{width : '60px', height : '20px', textAlign : 'center'}} placeholder="Price" />
                    </div>
                  )}
                  <h4>Description:</h4>
                  <textarea value={description} onChange={(e) => {setDescription(e.target.value)}} rows={4} className="profile-modal-textarea" placeholder="eg: We wil try to cover your product" />
                  <div style={{display : 'flex', justifyContent : 'center'}}><Button style={{width : '100px'}} variant="contained" onClick={handleSubmitButton}>Submit</Button></div>
              </Box>
            </Modal>
            {/* cover */}
            {getCoverImageComponents(gallery)}
            <div className='cover-container-mobile' onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <img src={`${s3Domain}/${gallery[coverIndexMobile]}`} />
                <div className='cover-indicator'>{coverIndexMobile+1}/{gallery.length}</div>
            </div>
            {/* profile */}
            <div className='profile-div' style={{justifyContent : 'space-between'}}>
                <div style={{display : 'flex'}}>
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
                  </div>
                </div>
                <div className="profile-buttons-container"> 
                  <button className="profile-buttons" onClick={handleEditProfile}>Edit profile</button>
                  <Link className="profile-buttons" to={'/user/orders'} >Orders</Link>
                </div>
            </div>
            <p className="profile-bio">{bio}</p>
            <div className='price-box'>
                <div className="profile-packages">
                  <p>Packages</p> 
                  <FaInfoCircle />
                </div>
                <div className="price-items-container">
                  {priceItem(iprice, 1)}
                  {priceItem(yprice, 0)}
                </div>
               
            </div>
          </div>
      )}
      
    </div>
  );
};

export default Account;



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
