import React, { useEffect, useState } from "react";
import { BACKEND_URL, formatFollowers } from "./assets/Data";
import "./Campaign.css";
import { useNavigateCustom } from "./CustomNavigate";
function CampaignCard() {
  const [campaigns, setCampaigns] = useState([]);
 
  const navigate = useNavigateCustom();
  useEffect(() => {
    const getCampaignData = async () => {
      const response = await fetch(`${BACKEND_URL}/api/campaigns`,{credentials:"include"});
      const data = await response.json();
      setCampaigns(data.data);
    };
    getCampaignData();
  }, []);
  const handleClick = async (index) => {
    navigate(`/campaigns/${campaigns[index]._id}`, {
      state: { account: campaigns[index] },
    });
  };

  return (
    <>


      { }
      <div className="campaignfeed-container">
        { campaigns && campaigns.map((campaign, index) => (
          <div className="campaign-container" onClick={() => handleClick(index)}>
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
              <p>
                <span>Title:</span> {campaign.title}
              </p>
              <p>
                <span>Amount:</span> {campaign.amount}
              </p>
              <p>
                <span>Follower Range:</span> {formatFollowers(campaign.criteria?.followerCount?.min)} -{" "}
                {formatFollowers(campaign.criteria?.followerCount?.max)}
              </p>
              <p>
                <span>Gender:</span> {campaign?.criteria?.gender}
              </p>
              <p>
                <span>Platform:</span>{campaign?.criteria?.platform?.join(",")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CampaignCard;
