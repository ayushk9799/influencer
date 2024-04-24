import React, { useRef, useState } from "react";
import "./page3.css";
import { IoIosPersonAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import {  FiUpload } from "react-icons/fi";
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { setCurrentStep, updateFormData } from "../../redux/FormSlice";
import FormHeader from "../subcomponents/FormHeader";

const s3Domain = 'https://thousand-ways.s3.ap-south-1.amazonaws.com';

const Page3 = () => {
  const {formData, currentStep} = useSelector(state=>state.form);
  const imagesLocal = formData?.images;
  const [profileImage, setProfileImage] = useState();
  const [coverImages, setCoverImages] = useState();
  const [deletedKeys, setDeletedKeys] = useState([]);
  const [loader, setLoader] = useState(false);
  const profilePicRef = useRef();
  const photosRef = useRef();
  const profileAlertRef = useRef();

  const dispatch = useDispatch();
  // console.log('local',imagesLocal);
  // console.log('cover', coverImages);
  
  // profile picture selector
  const handler = (e) => {
    const file = e.target.files[0];
    profileAlertRef.current.style.display = 'none';
    setProfileImage(file);
  };  

  // cover photo selector
  const handlePhotos = (e) => {
    const files = e.target.files;
    const p = Array.from(files);
    if(p.length > 4) {
      alert('Maximum 4 photos allowed');
      return;
    }
    if(!coverImages) {
      setCoverImages(p);
    } else {
      setCoverImages([...coverImages, ...p])
    }
  };

  // continue button i.e submit
  const handlerContinue = async() => {

    if(!profileImage && !imagesLocal) {
      // alert('Select profile picture!');
      profileAlertRef.current.style.display = 'block'
      return;
    }
    setLoader(true);

    const form = new FormData();
    if(profileImage) {
      form.append('profile', profileImage);
    }
   
    if(coverImages) {
      for(let i = 0; i < coverImages.length; i++) {
        form.append(`files`, coverImages[i]);
      }
    }

    if(deletedKeys.length > 0) {
      form.append('deletedKeys', JSON.stringify(deletedKeys));
    }
    
    try{
      const {data, status} = await axios.post('http://localhost:3001/upload', form, {
        headers: {
        'Content-Type': 'multipart/form-data',
        'id': 'ayush' // Add ID as a custom header
      }
    })
      const {profile, cover} = data;
      if(status === 200) {
        if(profileImage && !profile) {
          console.log('Some images is not uploaded-profile')
        }

        if(coverImages && cover) {
          if(coverImages.length !== cover.length) {
          console.log('Some images is not uploaded-profile')
          }
        }
        
        dispatch(updateFormData({images : {
          profile : 'profile',
          cover : cover
        }}));
        setLoader(false);
        dispatch(setCurrentStep(currentStep+1));
      }
    } catch(err) {
      console.log('somethings went wrong', err);
      setLoader(false)
    }
  }

  // delete cover picture
  const handleDelete = (index, type) => {
    if(type === 0) {
      const newCoverImages = coverImages.filter((_, i) => i !== index);
      setCoverImages(newCoverImages);
    } else {
      setDeletedKeys([...deletedKeys, imagesLocal.cover[index]]);
      const newImagesLocal = imagesLocal.cover.filter((_, i) => i !== index);
      dispatch(updateFormData({images : {
        ...imagesLocal,
        cover : newImagesLocal
      }}));
    }
  }




  return (
    <div className="containerx">
      <FormHeader heading={'Upload images'} />
      <div className="profile-container" onClick={() => profilePicRef.current.click()}>
        {(profileImage || imagesLocal) ? (
          <img alt="profile" src={profileImage ? URL.createObjectURL(profileImage) : `${s3Domain}/${imagesLocal.profile}`} style={{ height: "75px", width: "75px", objectFit : 'cover' }} />
        ) : (
          <IoIosPersonAdd style={{ height: 50, width: 50 }} />
        )}
        <input ref={profilePicRef} type="file" onChange={handler} hidden accept="image/*" />
      </div>
      <p ref={profileAlertRef} className="profile-alert">Please select profile picture.</p>
      <p>Profile Picture</p>
      <p className="text-instruction">Timeline: Add images upto 4.</p>
      <div className="images-container">
        {coverImages && coverImages.length ? (
          coverImages.map((value, index) => (
            <div key={URL.createObjectURL(value)} className="cover-image">
              <img src={URL.createObjectURL(value)} alt="images" />
              <div onClick={(e) => {handleDelete(index, 0)} } className='delete-button'>
                <TiDelete size={25} color="red" />
              </div>
            </div>
          ))
        ) : ( 
          imagesLocal?.cover && imagesLocal.cover.length ? (
            imagesLocal.cover.map((value, index) => (
              <div key={value} className="cover-image">
                <img accept="image/*" src={`${s3Domain}/${value}`} alt="images"  />
                <div onClick={(e) => {handleDelete(index, 1);} }  className='delete-button' >
                  <TiDelete color="red" size={25} />
                </div>
              </div>
            ))
          ) :
          <div className="upload-phtos-btn" onClick={(e) => {e.preventDefault(); photosRef.current.click();}}>
            <FiUpload />
            <p>Upload Photos</p>
          </div>
        )}
        <div onClick={(e) => {e.preventDefault(); photosRef.current.click();}} className="button-add-image">add more image</div>
        <input ref={photosRef} type="file" hidden multiple onChange={handlePhotos} accept="image/*" />
      </div>
      <div style={{display : 'flex'}}>
        {/* <button onClick={() => photosRef.current.click()}>add image</button> */}
        <button className="button-submit" onClick={handlerContinue} disabled={loader} >
          {loader && (
            <div class="loader"></div>
          )}
          <p>CONTINUE</p>
        </button>
      </div>
    </div>
  );
};

export default Page3;


