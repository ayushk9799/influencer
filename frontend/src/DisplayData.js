import { useEffect, useState } from "react";
import "./DisplayData.css";
import { useNavigate } from "react-router-dom";
import { getCategory } from "./assets/Data.js";
import { iconsArr } from "./assets/Data.js";
export const DisplayData = () => {
  const navigate = useNavigate();
  //const data=useMemo(()=>MockData,[MockData]);
  // const [data, setData] = useState([]);
  const data = [
    {
      iprice: {
        photo: 5666,
      },
      _id: "6628333b0acc5a2717a0fc42",
      name: "Ayush Kumar",
      contentCreator: false,
      field: ["1", "2", "4", "6", "8"],
      profilepic:
        "https://lh3.googleusercontent.com/a/ACg8ocIwIOkZVBiFS2sAjqsP1Msnpc7Gn3I9gciI9cLQd3dTCDg2HA=s96-c",
      gallery: ["6e688a54-4b36-479d-8b22-42012171108a"],
      iverification: false,
      iposts: 0,
      uverification: false,
      __v: 3,
      bio: "hello this my bio",
      gender: "male",
      iaccountID: "india ",
      mobileNumber: 9799819942,
      region: "ewrefwerf",
      yverification: false,
    },
    {
      iprice: {
        photo: 5666,
      },
      _id: "6628333b0acc5a2717a0fc42",
      name: "Ayush Kumar",
      contentCreator: false,
      field: ["1", "2", "4", "6", "8"],
      profilepic:
        "https://lh3.googleusercontent.com/a/ACg8ocIwIOkZVBiFS2sAjqsP1Msnpc7Gn3I9gciI9cLQd3dTCDg2HA=s96-c",
      gallery: ["6e688a54-4b36-479d-8b22-42012171108a"],
      iverification: false,
      iposts: 0,
      uverification: false,
      __v: 3,
      bio: "hello this my bio",
      gender: "male",
      iaccountID: "india ",
      mobileNumber: 9799819942,
      region: "ewrefwerf",
      yverification: false,
    },
    {
      iprice: {
        photo: 5666,
      },
      _id: "6628333b0acc5a2717a0fc42",
      name: "Ayush Kumar",
      contentCreator: false,
      field: ["1", "2", "4", "6", "8"],
      profilepic:
        "https://lh3.googleusercontent.com/a/ACg8ocIwIOkZVBiFS2sAjqsP1Msnpc7Gn3I9gciI9cLQd3dTCDg2HA=s96-c",
      gallery: ["6e688a54-4b36-479d-8b22-42012171108a"],
      iverification: false,
      iposts: 0,
      uverification: false,
      __v: 3,
      bio: "hello this my bio",
      gender: "male",
      iaccountID: "india ",
      mobileNumber: 9799819942,
      region: "ewrefwerf",
      yverification: false,
    },
    {
      iprice: {
        photo: 5666,
      },
      _id: "6628333b0acc5a2717a0fc42",
      name: "Ayush Kumar",
      contentCreator: false,
      field: ["1", "2", "4", "6", "8"],
      profilepic:
        "https://lh3.googleusercontent.com/a/ACg8ocIwIOkZVBiFS2sAjqsP1Msnpc7Gn3I9gciI9cLQd3dTCDg2HA=s96-c",
      gallery: ["6e688a54-4b36-479d-8b22-42012171108a"],
      iverification: false,
      iposts: 0,
      uverification: false,
      __v: 3,
      bio: "hello this my bio",
      gender: "male",
      iaccountID: "india ",
      mobileNumber: 9799819942,
      region: "ewrefwerf",
      yverification: false,
    },
    {
      iprice: {
        photo: 5666,
      },
      _id: "6628333b0acc5a2717a0fc42",
      name: "Ayush Kumar",
      contentCreator: false,
      field: ["1", "2", "4", "6", "8"],
      profilepic:
        "https://lh3.googleusercontent.com/a/ACg8ocIwIOkZVBiFS2sAjqsP1Msnpc7Gn3I9gciI9cLQd3dTCDg2HA=s96-c",
      gallery: ["6e688a54-4b36-479d-8b22-42012171108a"],
      iverification: false,
      iposts: 0,
      uverification: false,
      __v: 3,
      bio: "hello this my bio",
      gender: "male",
      iaccountID: "india ",
      mobileNumber: 9799819942,
      region: "ewrefwerf",
      yverification: false,
    },
    {
      iprice: {
        photo: 5666,
      },
      _id: "6628333b0acc5a2717a0fc42",
      name: "Ayush Kumar",
      contentCreator: false,
      field: ["1", "2", "4", "6", "8"],
      profilepic:
        "https://lh3.googleusercontent.com/a/ACg8ocIwIOkZVBiFS2sAjqsP1Msnpc7Gn3I9gciI9cLQd3dTCDg2HA=s96-c",
      gallery: ["6e688a54-4b36-479d-8b22-42012171108a"],
      iverification: false,
      iposts: 0,
      uverification: false,
      __v: 3,
      bio: "hello this my bio",
      gender: "male",
      iaccountID: "india ",
      mobileNumber: 9799819942,
      region: "ewrefwerf",
      yverification: false,
    },
    {
      iprice: {
        photo: 5666,
      },
      _id: "6628333b0acc5a2717a0fc42",
      name: "Ayush Kumar",
      contentCreator: false,
      field: ["1", "8"],
      profilepic:
        "https://lh3.googleusercontent.com/a/ACg8ocIwIOkZVBiFS2sAjqsP1Msnpc7Gn3I9gciI9cLQd3dTCDg2HA=s96-c",
      gallery: ["6e688a54-4b36-479d-8b22-42012171108a"],
      iverification: false,
      iposts: 0,
      uverification: false,
      __v: 3,
      bio: "hello this my bio",
      gender: "male",
      iaccountID: "india",
      ifollowers: 500,
      yaccountID: "youtube",
      yfollowers: 600,
      mobileNumber: 9799819942,
      region: "ewrefwerf",
      yverification: false,
      yprice:{
        video:5000
      }
    },
   
  ];

  const  findLowest=(num1, num2, num3) =>{

    const value1 = num1 === undefined ? Infinity : num1;
    const value2 = num2 === undefined ? Infinity : num2;
    const value3 = num3 === undefined ? Infinity : num3;

    const lowestValue = Math.min(value1, value2, value3);
    if (lowestValue === Infinity) {
      return undefined; 
    }
  
    return lowestValue; 
  }
  console.log(data);
  const handleInfluncerClick = (uniqueID) => {
    console.log("clicked")
    navigate(`/influencer/${uniqueID}`, { state: { account: uniqueID } });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <div
          className="grid-container"
          style={{ width: (data.length + 1) * 200 + "px" }}
        >
          {data.map((item, index) => (
            <div key={index} className="grid-item" onClick={()=>handleInfluncerClick(item.uniqueID)}>
              <div className="nameRegionImage">
                <img src={item.profilepic} alt="Profile Pic" />
                <div className="nameRegion">
                  <div className="name">{item.name}</div>
                  <div style={{ fontSize: "10px" }}>{item.region}</div>
                </div>
                <div className="pricing">{findLowest(item.iprice?.video,item.iprice?.photo,item.yprice?.video)}</div>
              </div>

              <div className="detailsContainer">
                <div
                  className="socialMedia"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {item.iaccountID ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize:'13px',
                        fontWeight:'500'
                      }}
                    >
                      {iconsArr[0]} {item.ifollowers} Followers
                      
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {item.yaccountID ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize:'13px',
                        fontWeight:'500'
                      }}
                    >
                      {iconsArr[1]} {item.yfollowers} Followers
                     
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="fieldContainer" style={{ width: "100%" }}>
                  {item.field.map((fieldIndex) => (
                    <div className="fields">{getCategory(fieldIndex)}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
