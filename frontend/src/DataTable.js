import { useEffect, useState } from "react";
import "./DataTable.css";
import { useNavigate } from "react-router-dom";
export const DataTable = () => {
  const navigate = useNavigate();
  //const data=useMemo(()=>MockData,[MockData]);
 // const [data, setData] = useState([]);
const data=[ {
  "iprice": {
      "photo": 5666
  },
  "_id": "6628333b0acc5a2717a0fc42",
  "name": "Ayush Kumar",
  "contentCreator": false,
  "field": [
      "1",
      "2",
      "4",
      "6",
      "8"
  ],
  "profilepic": "https://lh3.googleusercontent.com/a/ACg8ocIwIOkZVBiFS2sAjqsP1Msnpc7Gn3I9gciI9cLQd3dTCDg2HA=s96-c",
  "gallery": [
      "6e688a54-4b36-479d-8b22-42012171108a"
  ],
  "iverification": false,
  "iposts": 0,
  "uverification": false,
  "__v": 3,
  "bio": "hello this my bio",
  "gender": "male",
  "iaccountID": "india ",
  "mobileNumber": 9799819942,
  "region": "ewrefwerf",
  "yverification": false
},
{
  "iprice": {
      "photo": 5666
  },
  "_id": "6628333b0acc5a2717a0fc42",
  "name": "Ayush Kumar",
  "contentCreator": false,
  "field": [
      "1",
      "2",
      "4",
      "6",
      "8"
  ],
  "profilepic": "https://lh3.googleusercontent.com/a/ACg8ocIwIOkZVBiFS2sAjqsP1Msnpc7Gn3I9gciI9cLQd3dTCDg2HA=s96-c",
  "gallery": [
      "6e688a54-4b36-479d-8b22-42012171108a"
  ],
  "iverification": false,
  "iposts": 0,
  "uverification": false,
  "__v": 3,
  "bio": "hello this my bio",
  "gender": "male",
  "iaccountID": "india ",
  "mobileNumber": 9799819942,
  "region": "ewrefwerf",
  "yverification": false
},
{
  "iprice": {
      "photo": 5666
  },
  "_id": "6628333b0acc5a2717a0fc42",
  "name": "Ayush Kumar",
  "contentCreator": false,
  "field": [
      "1",
      "2",
      "4",
      "6",
      "8"
  ],
  "profilepic": "https://lh3.googleusercontent.com/a/ACg8ocIwIOkZVBiFS2sAjqsP1Msnpc7Gn3I9gciI9cLQd3dTCDg2HA=s96-c",
  "gallery": [
      "6e688a54-4b36-479d-8b22-42012171108a"
  ],
  "iverification": false,
  "iposts": 0,
  "uverification": false,
  "__v": 3,
  "bio": "hello this my bio",
  "gender": "male",
  "iaccountID": "india ",
  "mobileNumber": 9799819942,
  "region": "ewrefwerf",
  "yverification": false
},]
 
  // useEffect(() => {
  //   fetch("http://localhost:3000/getInfluencers/featured/platform/instagram")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setData(data.data);
  //     });
  // }, []);
console.log(data)
  // console.log(data[0]?.price.video)
  const handleInfluncerChat = (accountID) => {
    navigate(`/influencer/${accountID}`, { state: { account: accountID } });
  };
  return (
    <>
    <div  style={{display:'flex',justifyContent:'center' ,alignItems:'center',border:'1px solid green'}}>

    <div className="grid-container" style={{width:(data.length+1)*200+"px"}}>
    {data.map((item, index) => (
      <div key={index} className="grid-item">
        {/* <img src={item.profilepic} alt="Profile Pic" /> */}
        <div  className="detailsContainer">
        <div className="name-overlay">{item.name}</div>
        <div>{item.city}</div>
        </div>
       
      </div>
    ))}
  </div>
    </div>
   
    </>
  );
};
