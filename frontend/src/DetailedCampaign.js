import React from "react";
import { useLocation } from "react-router-dom";
import "./DetailedCampaign.css";
import { s3Domain, formatFollowers } from "./assets/Data";
const DetailedCampaign = () => {
  const location = useLocation();

  const campaign = location.state.account;
  return (
    <div>
      <main className="containercampaign">
        <div className="grid">
          <div className="space-y-6 space-x-*">
            <h1>{campaign.title}</h1>
            <h2>Campaign Criteria</h2>
            <div className="criteriagrid">
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <h3>Target Platform</h3>
                <p className="text-muted-foreground">
                  {campaign.criteria.platform}
                </p>
              </div>
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <h3>Amount</h3>
                <p className="text-muted-foreground">${campaign.amount}</p>
              </div>
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <h3>Target Gender</h3>
                <p className="text-muted-foreground">
                  {campaign.criteria.gender}
                </p>
              </div>
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <h3>Follower Count</h3>
                <p className="text-muted-foreground">
                  {formatFollowers(campaign.criteria.followerCount.min)}--
                  {formatFollowers(campaign.criteria.followerCount.max)}
                </p>
              </div>
            </div>
            <div className="mt-12 space-y-8">
              <h2>Campaign Description</h2>
              <div className="campaigndescription">
                <p>{campaign.description}</p>
              </div>
            </div>
          </div>
          <div
            className="imagescontainerCampaign"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(
                campaign?.images?.length,
                2
              )}, 1fr)`,
              height: `${200 * Math.ceil(campaign.images.length / 2)}px`,
              columnGap: "5px",
              rowGap: "5px",
            }}
          >
            {campaign?.images.map((image) => (
              <img
                src={`${s3Domain}/${image}`}
                style={{ width: "100%", height: "100%" }}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailedCampaign;
