import React, {useMemo, useState} from 'react'
import "./profile.css"
import { getCategory, getIcons, getSociaIndex } from '../assets/Data'
import {useNavigate } from 'react-router-dom'

const userData = {
    "id" : "xyx",
    "name" : "Rajiv Ranjan",
    "phone" : 9097849090,
    "email" : "rajivranjan0013@gmail.com",
    "city" : "Patna",
    "description" : "This is a motovloging channel. All foreign trip blog is here",
    "categories" : [1,3,5],
    "images" : {
        // "profile" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwzqBOQU8-rmsHcEGZ1imKdw5fefN4G0gkyZdM6ydMNg&s",
        "profile" : "https://thousand-ways.s3.ap-south-1.amazonaws.com/profile",
        "cover" : "https://assets.iplt20.com/bcci/articles/1705737695_Tata%20IPL%20Thumbnail.webp"
    },
    "social" : {
        0 : {
            "social_id" : "rajivrocky90",
            "followers" : "100k",
            "price" : {
                "photo" : 20000,
                "video" : 40000,
            } 
        },
        3 : {
            "social_id" : "rajivrocky90",
            "followers" : "20k",
            "price" : {
                "photo" : 20000,
                "video" : 40000,
            } 
        }
    }
}

const coverImage = [
    '3f17c5fb-c18e-4179-8004-62720f4b4627',
    // 'e50c04dc-7440-4408-8853-76c1fa8357f0',
    // '8d842490-d5bf-4872-ab6a-24d2db9dbe5f',
    // '4a03458b-c875-4703-a336-96b524dd449e',
]

const s3Domain = 'https://thousand-ways.s3.ap-south-1.amazonaws.com';



const Profile = () => {
    const {categories} = userData
    const navigate = useNavigate ();
    const [startX, setStartX] = useState(0);
    const [coverIndexMobile, setCoverIndexMobile] = useState(0);
    // const [dist, setDist] = useState(0);

    const handleTouchStart = (event) => {
        const touch = event.touches[0];
        setStartX(touch.pageX);
      };
    
      const handleTouchEnd = (event) => {
        const touch = event.changedTouches[0];
        const dist = touch.pageX - startX;
        // setDist(dist);
    
        if (Math.abs(dist) >= 30) {
            const len = coverImage.length;
          if (dist < 0) {
            setCoverIndexMobile((coverIndexMobile+1)%len)
          } else {
            setCoverIndexMobile(coverIndexMobile===0?len-1:coverIndexMobile-1);
          }
        }
      };

    const socialIdexes = useMemo(() => {
        const {social} = userData;
        const arr = [];
        for(let key in social) {
            arr.push(key);
        }
        return arr;
    }, [])

    const handleContinue = (index, type) => {
        if(index > 3) {
            navigate("/checkout");
            return;
        }
        navigate('/checkout', {state : {data : {index, type}}});
    }





  return (
    <div className='main'>
        <div className='container' >
            {/* cover */}
            {getCoverImageComponents(coverImage)}
            <div className='cover-container-mobile' onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <img src={`${s3Domain}/${coverImage[coverIndexMobile]}`} />
                <div className='cover-indicator'>{coverIndexMobile+1}/{coverImage.length}</div>
            </div>
            {/* profile */}
            <div className='profile-div'>
                <div className='image-div'>
                    <img src={userData.images.profile} alt='image' style={{height : '100px', width : '100px'}} />
                </div>
                
                <div>
                    <p className='name'>{userData.name}</p>
                    <div className='category-container'>
                        {
                            categories && categories.map((val) => (
                                <div key={val}>
                                    {getCategory(val)}
                                </div>
                            ))
                        }
                    </div>
                    <div className='field-container'>
                        {
                            socialIdexes.map((val) => (
                                <a href={"#"} className='field-element' key={val}>
                                    {getIcons(val)}144k
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
            <p>{userData.description}</p>
            <div>
                <p>Packages</p>
                <div>
                {
                    socialIdexes && socialIdexes.map(val => (
                    <div key={val}>
                        <div className='price-items'>
                            {getIcons(val)}
                            <p>{getSociaIndex(val)} {val===0 ? 'Post/Stories' : 'Post'}</p>
                            <p>₹{userData.social[val].price.photo}</p>
                            <button onClick={() => handleContinue(val, 0)}>Continue</button>
                        </div>
                        <div className='price-items'>
                            {getIcons(val)}
                            <p>{getSociaIndex(val)} {val===0 ? 'Reels' : 'Videos'}</p>
                            <p>₹{userData.social[val].price.photo}</p>
                            <button onClick={() => handleContinue(val, 1)}>Continue</button>
                        </div>
                        </div>
                    ))
                }
                </div>
                <div className='price-items'>
                    <p>Do you want to send custom offer</p>
                    <button onClick={() => handleContinue(4, 0)}>Make Custom Offer</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile

const getCoverImageComponents = (coverImage) => {
    const size = coverImage?.length || 0;
    if(size===1) {
        return (
           <div className='cover-container'>
             <img src={`${s3Domain}/${coverImage[0]}`} alt='cover' />
           </div>
        )
    } else if(size === 2) {
        return (
          <div className='cover-container'>
                <div><img src={`${s3Domain}/${coverImage[0]}`} alt='cover' /></div>
                <div><img src={`${s3Domain}/${coverImage[1]}`} alt='cover' /></div>
          </div>
        )
    } else if (size === 3) {
        return (
        <div className='cover-container'>
            <div><img src={`${s3Domain}/${coverImage[0]}`} alt='cover' /></div>
            <div className='image-three'>
                <div><img src={`${s3Domain}/${coverImage[1]}`} alt='cover' /></div>
                <div><img src={`${s3Domain}/${coverImage[2]}`} alt='cover' /></div>
            </div>
        </div>
        )
    } else if(size === 4) {
        return (
        <div className='cover-container'>
            <div><img src={`${s3Domain}/${coverImage[0]}`} alt='cover' /></div>
            <div className="image-three" >
                <div className="third">
                    <img src={`${s3Domain}/${coverImage[1]}`} alt='cover' />
                    <img src={`${s3Domain}/${coverImage[2]}`} alt='cover' /> 
                </div>
                <div><img src={`${s3Domain}/${coverImage[3]}`} alt='cover' /></div>
            </div>
        </div>
        )
    }
}