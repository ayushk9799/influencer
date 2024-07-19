import React, { useState } from "react";
import "./CampaignForm.css";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import { BACKEND_URL, getCategory, s3Domain } from "./assets/Data";
import { useNavigateCustom } from "./CustomNavigate";

export const CampaignForm = () => {
  const categoriesDb = getCategory(-1);
  const [Alerts, setAlert] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate=useNavigateCustom();
  const [formData, setFormData] = useState({
    title: "",
    gender: "",
    minFollowers: "",
    maxFollowers: "",
    amount: "",
    platform: [],
    images: [],
    fields: [],
    description: "",
  });
  const toggleCategory = (category) => {
    console.log(category);
    const updatedFields = formData.fields.includes(category)
      ? formData.fields.filter((field) => field !== category)
      : [...formData.fields, category];

    setFormData((prevFormData) => ({
      ...prevFormData,
      fields: updatedFields,
    }));
  };
  console.log(formData.images)

  const handlechange = (event) => {
    const { name, value, checked } = event.target;
    console.log(name);
    console.log(value);

    setFormData((prevFormData) => {
      if (name === "platform") {
        if (checked) {
          return {
            ...prevFormData,
            [name]: [...prevFormData.platform, value],
          };
        } else {
          return {
            ...prevFormData,
            [name]: prevFormData.platform.filter(
              (platform) => platform !== value
            ),
          };
        }
      } else {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  };
  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      setLoader(true);
      if (!formData.amount || !formData.title || !formData.description) {
        let error = [];
        if (!formData.amount) {
          error.push("AMOUNT");
        }
        if (!formData.title) {
          error.push("TITLE");
        }
        if (!formData.description) {
          error.push("DESCRIPTION");
        }
        setAlert(`Please enter ${error.join(' , ')}`);
        setTimeout(()=>
        {
              setAlert("");
        },5000)
        return;
      }
      if (formData.images.length) {
        const { data, status } = await axios.get(
          `${BACKEND_URL}/api/user/presigned?total=${formData.images.length}`,
          {
            withCredentials: true,
          }
        );
        if (status === 200) {
          const { keys, urls } = data;
          for (let i = 0; i < formData.images.length; i++) {
            const { status } = await fetch(urls[i], {
              method: "PUT",
              body: formData.images[i],
            });
            if (status === 200) {
              formData.images[i] = keys[i];
            }
          }
        }
      }
     
      const response = await fetch(`${BACKEND_URL}/api/campaigns`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData }),
      });
       
      if(response.status===201)
        {
          navigate('/myCampaigns')
        }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleImageUpload = (event) => {
    const files = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, files],
    }));
  };
  return (
    <div className="form-container">
      {Alerts && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            justifySelf: "center",
            zIndex: 1000,
          
          }}
        >
          <Alert  severity="error">
            {Alerts}
          </Alert>
        </div>
      )}
      <h1>Create Campaign</h1>
      <p>Fill out the details to create your campaign.</p>
      <form>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">
              Title<span className="requiredoroptional">(required)</span>
            </label>
            <input
              type="text"
              placeholder="Enter title for campaign"
              name="title"
              value={formData.title}
              onChange={handlechange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              className="styled-select"
              onChange={handlechange}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Any">Any</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="min-followers">Minimum Followers</label>
            <input
              type="number"
              id="min-followers"
              name="minFollowers"
              placeholder="Enter minimum followers"
              onChange={handlechange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="max-followers">Maximum Followers</label>
            <input
              type="number"
              id="max-followers"
              name="maxFollowers"
              placeholder="Enter maximum followers"
              onChange={handlechange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">
              Amount<span className="requiredoroptional">(required)</span>
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter amount"
              onChange={handlechange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="platform">Social Media Platform</label>

            <label className="checkboxlabel">
              <input
                type="checkbox"
                name="platform"
                value="Instagram"
                checked={formData.platform?.includes("Instagram")}
                onChange={handlechange}
                className="checkboxlabel"
              />
              Instagram
            </label>
            <label className="checkboxlabel">
              <input
                type="checkbox"
                name="platform"
                value="YouTube"
                checked={formData.platform?.includes("YouTube")}
                onChange={handlechange}
                className="checkboxlabel"
              />
              YouTube
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Categories</label>
          <div className="categories-campaign">
            {categoriesDb.map((category) => (
              <div
                key={category}
                className={`categoriesindi ${
                  formData.fields.includes(category) ? "selected" : ""
                }`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Images</label>
          <div className="image-upload-container">
            {formData.images.length > 0 &&
              formData.images.map((images) => (
                <div className="image-upload border none">
                  <img
                    src={
                      typeof images === "string"
                        ? `${s3Domain}/${images}`
                        : URL.createObjectURL(images)
                    }
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ))}
            {formData.images.length !== 4 &&
              new Array(4 - formData.images.length).fill(0).map(() => (
                <div className="image-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  +
                </div>
              ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="description">Campaign Description</label>
            <textarea
              placeholder="Explain what content creator has to do ??"
              value={formData.description}
              onChange={handlechange}
              name="description"
            />
          </div>
        </div>
        <div className="submitButton">
          {" "}
          <button type="submit" onClick={handlesubmit}>
            {loader ? <CircularProgress /> : <div>submit</div>}
          </button>
        </div>
      </form>
    </div>
  );
};
