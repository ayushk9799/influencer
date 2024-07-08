import React, { useEffect, useRef, useState } from "react";
import "./featured.css";
import {
  BACKEND_URL,
  formatFollowers,
  getCategory,
  iconsArr,
} from "../../assets/Data";
import { useNavigateCustom } from "../../CustomNavigate";
import { FaDollarSign } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";

const Featured = (props) => {
  const {feed1, feed2} = useSelector(state => state.feed);
  // const [feedData, setFeedData] = useState(props?.name ? feed2 : feed1);
  const feedData = props?.name ? feed2 : feed1;
  // const dispatch = useDispatch();
  // const feedDataRef = useRef([]);
  const navigate = useNavigateCustom();
  const [favourite, setfavourite] = useState({});
  const { userDetails } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if(feedData.length === 0) {
  //     dispatch(getFeedData());
  //   }
  // }, [])

  // useEffect(() => {
  //   const getData = async () => {
  //     if (feedDataRef.current?.length > 0) {
  //       setFeedData(feedDataRef.current); // Use the persisted data
  //       return;
  //     }
  //     try {
  //       let url = `${BACKEND_URL}/api/getInfluencers/featured/feed`;
  //       if (props.name) {
  //         url += `?type=trending`;
  //       }
  //       const response = await fetch(url);
  //       if (response.ok) {
  //         let data = await response.json();
  //         setFeedData(data.data);
  //         feedDataRef.current = data.data;
  //       } else {
  //         throw new Error("erro in getting data");
  //       }
  //     } catch (error) {}
  //   };
  //   getData();
  // }, []);



  useEffect(() => {
    let object = {};
    userDetails?.favourites?.map((favourite) => (object[favourite] = true));
    setfavourite((prev) => ({ ...prev, ...object }));
  }, [userDetails]);

  const handleInfluncerClick = (event, item) => {
    event.preventDefault();
    navigate(`/influencer/${item.uniqueID}`, { state: { account: item } });
  };

  const handleFavouriteDatabase = async (id, conditions) => {
    let url;
    if (conditions) {
      url = `${BACKEND_URL}/api/user/favourite/create/${id}`;
    } else {
      url = `${BACKEND_URL}/api/user/favourite/remove/${id}`;
    }
    try {
      await fetch(url, { credentials: "include" });
    } catch (error) {}
  };
  const handleFavourite = async (event, id) => {
    event.preventDefault();
    event.stopPropagation();

    setfavourite((previouState) => ({ ...previouState, [id]: !favourite[id] }));

    await handleFavouriteDatabase(id, !favourite[id]);
  };

  return (
    <div id="featured-container">
      <div className="featured-header">
        <div>
          <h2 style={{ fontSize: "20px" }}>{props.name || "Featured"}</h2>
          <p>
            {props.name
              ? "Trending instagram influencer"
              : "Top influencers across globe"}
          </p>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/influencer/search");
          }}
        >
          <h4>See All</h4>
        </div>
      </div>

      <div id="display-data-container">
        {feedData.length === 0 ? (
          [...Array(5)].map((_, index) => (
            <div key={index} className="f-grid-item" style={{cursor : 'default'}}>
              <Skeleton
                variant="rounded"
                style={{ height: "320px", width: "280px" }}
                animation={"wave"}
              />
              <Skeleton
                variant="text"
                style={{ height: "20px", width: "100px" }}
                animation={"wave"}
              />
              <Skeleton
                variant="text"
                style={{ height: "20px", width: "150px" }}
                animation={"wave"}
              />
            </div>
          ))
        ) : (
          feedData.map((item, index) => (
            <div
              key={index}
              className="f-grid-item"
              onClick={(event) => handleInfluncerClick(event, item)}
            >
              <div
                className="heart"
                onClick={(event) => handleFavourite(event, item._id)}
              >
                {" "}
                <AiFillHeart
                  size={25}
                  color={favourite[item._id] ? "red" : "white"}
                />
              </div>
              <div className="nameRegionImage">
                <div className="f-item-image">
                  <img
                    style={{ height: "100%", width: "100%" }}
                    src={item.profilePic}
                    alt="Profile Pic"
                  />
                </div>
                <div id="name-region-container">
                  
                <div className="nameRegion">
                  <div className="nameInfu">{item.name}</div>
                  <div style={{ fontSize: "10px", padding: "5px" }}>
                    {item.region}
                  </div>
                </div>
                <div className="pricing">
                  <FaDollarSign />
                  {item.price}
                </div>
                </div>
              </div>

              <div className="detailsContainer">
                <div
                  className="socialMedia"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: "25px",
                  }}
                >
                  {item.iaccountID ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      <div
                        style={{
                          textDecoration: "none",
                          color: "black",
                          display: "flex", // Add this line
                          alignItems: "center", // Add this line
                          gap: "2px",
                          fontFamily: "Roboto",
                        }}
                      >
                        {iconsArr[0]} {formatFollowers(item.ifollowers)}{" "}
                        Followers
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="fieldContainer" style={{ width: "100%" }}>
                  {item.field.map((fieldIndex, index) => (
                    <div className="fields" key={index}>
                      {getCategory(fieldIndex)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Featured;
