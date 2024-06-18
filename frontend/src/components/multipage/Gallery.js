import React, { useRef, useState } from "react";
import "./Gallery.css";
import { IoIosPersonAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { FiUpload } from "react-icons/fi";
import { BACKEND_URL, s3Domain } from "../../assets/Data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, updateFormData } from "../../redux/FormSlice";
import FormHeader from "../subcomponents/FormHeader";

const Gallery = () => {
  const { formData, currentStep } = useSelector((state) => state.form);
  const { userDetails } = useSelector((state) => state.user);
  // const imagesLocal = formData?.images;
  const localProfilePicture = userDetails?.profilePic;
  const [localGallery, setLocalGallery] = useState(userDetails?.gallery);
  const [profileImage, setProfileImage] = useState();
  const [coverImages, setCoverImages] = useState([]);
  const [deletedKeys, setDeletedKeys] = useState([]);
  const [showGallery, setShowGallery] = useState([]);
  const [loader, setLoader] = useState(false);
  const profilePicRef = useRef();
  const photosRef = useRef();
  const profileAlertRef = useRef();

  const dispatch = useDispatch();

  // profile picture selector
  const handler = (e) => {
    const file = e.target.files[0];
    profileAlertRef.current.style.display = "none";
    setProfileImage(file);
  };

  // cover photo selector
  const handlePhotos = (e) => {
    const files = e.target.files;
    const p = Array.from(files);

    if (coverImages.length + p.length > 4) {
      alert("Maximum 4 photos allowed");
      return;
    }
    if (!coverImages) {
      setCoverImages(p);
    } else {
      setCoverImages([...coverImages, ...p]);
    }
  };

  // continue button i.e submit
  const handlerContinue = async () => {
    if (!profileImage && !localProfilePicture) {
      // alert('Select profile picture!');
      profileAlertRef.current.style.display = "block";
      return;
    }
    setLoader(true);

    if (deletedKeys.length > 0) {
      try {
        const { data, status } = await axios.get(
          `${BACKEND_URL}/api/user/delete?delete=${deletedKeys.join(",")}`,
          { withCredentials: true }
        );
        if (status === 200) {
          dispatch(updateFormData({ gallery: localGallery }));
        }
      } catch (error) {}
    }

    try {
      const { data, status } = await axios.get(
        `${BACKEND_URL}/api/user/presigned?total=${
          profileImage ? coverImages.length + 1 : coverImages.length
        }`,
        {
          withCredentials: true,
        }
      );

      // const { profile, cover } = data;
      if (status === 200) {
        const { keys, urls } = data;
        if (keys[0] && urls[0] !== -1 && profileImage) {
          const { status } = await fetch(urls[0], {
            method: "PUT",
            body: profileImage,
          });

          if (status === 200)
            dispatch(updateFormData({ profilePic: `${s3Domain}/${keys[0]}` }));
            else{
              console.log(status)
            }
        }
       

        if (coverImages.length > 0) {
          const coverArray = [...localGallery];
          let offset = 0;
          if (profileImage) {
            offset = 1;
          }
          for (let i = offset; i < urls.length; i++) {
            if (urls[i] !== -1) {
              const { status } = await fetch(urls[i], {
                method: "PUT",
                body: coverImages[i],
              });
              if (status === 200) {
                coverArray.push(keys[i]);
              }
            }
          }

          dispatch(updateFormData({ gallery: coverArray }));
        }

        setLoader(false);
        dispatch(setCurrentStep(currentStep + 1));
      }
    } catch (err) {
      setLoader(false);
    }
  };

  // delete cover picture
  const handleDelete = (index, type) => {
    if (type === 0) {
      const newCoverImages = coverImages.filter((_, i) => i !== index);
      setCoverImages(newCoverImages);
    } else {
      setDeletedKeys([...deletedKeys, localGallery[index]]);

      const newImagesLocal = localGallery.filter((_, i) => i !== index);
      setLocalGallery(newImagesLocal);
    }
  };

  return (
    <div className="containerx">
      <FormHeader heading={"Upload images"} />
      <div
        className="profile-container"
        onClick={() => profilePicRef.current.click()}
      >
        {profileImage || localProfilePicture ? (
          <img
            alt="profile"
            src={
              profileImage
                ? URL.createObjectURL(profileImage)
                : `${localProfilePicture}`
            }
            style={{ height: "75px", width: "75px", objectFit: "cover" }}
          />
        ) : (
          <IoIosPersonAdd style={{ height: 50, width: 50 }} />
        )}
        <input
          ref={profilePicRef}
          type="file"
          onChange={handler}
          hidden
          accept="image/*"
        />
      </div>
      <p ref={profileAlertRef} className="profile-alert">
        Please select profile picture.
      </p>
      <p>Profile Picture</p>
      <p className="text-instruction">Timeline: Add images upto 4.</p>
      <div className="images-container">
        {coverImages.length > 0 || localGallery.length > 0 ? (
          <>
            {coverImages && coverImages.length > 0 ? (
              coverImages.map((value, index) => (
                <div key={URL.createObjectURL(value)} className="cover-image">
                  <img src={URL.createObjectURL(value)} alt="images" />
                  <div
                    onClick={(e) => {
                      handleDelete(index, 0);
                    }}
                    className="delete-button"
                  >
                    <TiDelete size={25} color="red" />
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
            {localGallery && localGallery.length > 0 ? (
              localGallery.map((value, index) => (
                <div key={value} className="cover-image">
                  <img
                    accept="image/*"
                    src={`${s3Domain}/${value}`}
                    alt="images"
                  />
                  <div
                    onClick={(e) => {
                      handleDelete(index, 1);
                    }}
                    className="delete-button"
                  >
                    <TiDelete color="red" size={25} />
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </>
        ) : (
          <div
            className="upload-phtos-btn"
            onClick={(e) => {
              e.preventDefault();
              photosRef.current.click();
            }}
          >
            <FiUpload />
            <p>Upload Photos</p>
          </div>
        )}

        <div
          onClick={(e) => {
            e.preventDefault();
            photosRef.current.click();
          }}
          className="button-add-image"
        >
          add more image
        </div>
        <input
          ref={photosRef}
          type="file"
          hidden
          multiple
          onChange={handlePhotos}
          accept="image/*"
        />
      </div>
      <div style={{ display: "flex" }}>
        {/* <button onClick={() => photosRef.current.click()}>add image</button> */}
        <button
          className="button-submit"
          onClick={handlerContinue}
          disabled={loader}
        >
          {loader && <div className="loader"></div>}
          <p>CONTINUE</p>
        </button>
      </div>
    </div>
  );
};

export default Gallery;
