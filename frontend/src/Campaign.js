import React, { useEffect, useState } from "react";
import { BACKEND_URL, formatFollowers } from "./assets/Data";
import "./Campaign.css";
import { useNavigateCustom } from "./CustomNavigate";
function CampaignCard() {
  const [campaigns, setCampaigns] = useState([]);
  const navigate=useNavigateCustom();
  useEffect(() => {
    const getCampaignData = async () => {
      const response = await fetch(`${BACKEND_URL}/api/campaigns`);
      const data = await response.json();
      setCampaigns(data.data);
    };
    getCampaignData();
  }, []);
  const handleClick=async(index)=>
    {
         navigate(`/campaigns/${campaigns[index]._id}`,)
    }

  return (
  
  <div className="campaignfeed-container">
    {campaigns.map((campaign,index)=>(<div class="campaign-container" onClick={()=>handleClick(index)}>

  <div>
    <img
      src={`${campaign?.postedBy?.profilePic}`}
      alt="Campaign Image"
      class="campaign-image"
      width="200"
      height="200"
    />
  </div>
  <div class="campaign-details">
    <p><span>Title:</span> Exciting New Campaign</p>
    <p><span>Amount:</span> 5000</p>
    <p><span>Follower Range:</span> {formatFollowers(1000)} - {formatFollowers(10000)}</p>
    <p><span>Gender:</span> Any</p>
    <p><span>Platform:</span> Instagram</p>
  </div>
</div>))}
     
  </div>
 )
}

export default CampaignCard;
