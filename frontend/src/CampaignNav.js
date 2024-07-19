import React, { useState ,useEffect} from "react";
import "./CampaignNav.css";
import { useLocation } from "react-router-dom";
import { useNavigateCustom } from "./CustomNavigate";
export const CampaignNav = () => {
    const location = useLocation();

  const [selectedSection, setSelectedSection] = useState("feed");
  console.log(location.pathname)
  const currentNav=()=>
    {
        switch(location.pathname)
        {
          case "/campaignFeed" : setSelectedSection("feed");
           break;
           case "/createCampaign" :setSelectedSection('create');
           break;
           case "/myCampaigns" :setSelectedSection("myCampaigns");
           break;
           default :
              setSelectedSection("hello");
              console.log("hello")
        }
    }
 
  console.log(selectedSection)
  const navigate = useNavigateCustom();

  useEffect(() => {
      currentNav();
  }, [location]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="navigation-buttons">
        <button
          className={selectedSection === "feed" ? "active" : ""}
          onClick={() => {
            navigate("/campaignFeed");
            setSelectedSection("feed");
          }}
        >
          Feed
        </button>
        <button
          className={selectedSection === "create" ? "active" : ""}
          onClick={() => {
            navigate("/createCampaign");
            setSelectedSection("create");
          }}
        >
         + Create Campaign
        </button>
        <button
          className={selectedSection === "myCampaigns" ? "active" : ""}
          onClick={() => {
            navigate("/myCampaigns");
            setSelectedSection("myCampaigns");
          }}
        >
          My Campaigns
        </button>
      </div>
    </div>
  );
};
