import { useEffect, useState } from "react";
import "./DataTable.css";
import { useNavigate } from "react-router-dom";
export const DataTable = () => {
  const navigate = useNavigate();
  //const data=useMemo(()=>MockData,[MockData]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/getInfluencers/featured/platform/instagram")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data.data);
      });
  }, []);
console.log(data)
  // console.log(data[0]?.price.video)
  const handleInfluncerChat = (accountID) => {
    navigate(`/influencer/${accountID}`, { state: { account: accountID } });
  };
  return (
    <>
    <div className="grid-container">
    {data.map((item, index) => (
      <div key={index} className="grid-item">
        <img src={item.profilepic} alt="Profile Pic" />
        <div className="name-overlay">{item.name}</div>
        <div>{item.city}</div>
      </div>
    ))}
  </div>
    </>
  );
};
