import {
  useEffect,
  useState,
  useRef,
} from "react";
import "./DisplayData.css";
import { BACKEND_URL, formatFollowers, getCategory } from "./assets/Data.js";
import { iconsArr } from "./assets/Data.js";
import { useNavigateCustom } from "./CustomNavigate";
import { FaDollarSign } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
export const DisplayData = () => {
  const navigate = useNavigateCustom();
  const { userDetails } = useSelector((state) => state.user);

  const divRef = useRef(null);
  const [data, setData] = useState([]);
  const [favourite, setfavourite] = useState({});
  const [typeOfDataDisplay, settypeofDataDisplay] = useState();
  const location = useLocation();
  const query = location?.state?.query;

  useEffect(() => {
    let object = {};
    userDetails?.favourites?.map((favourite) => (object[favourite] = true));
    setfavourite((prev) => ({ ...prev, ...object }));
  }, [userDetails]);
  const getData = async () => {
    if (query) {
      let categories = getCategory(-1);
      let url = `${BACKEND_URL}/api/getInfluencers/search/?`;
      if (query.fmax !== undefined) url += `&fmax=${query.fmax}`;
      if (query.fmin !== undefined) url += `&fmin=${query.fmin}`;
      if (query.region !== undefined) url += `&region=${query.region}`;
      if (query.platform !== undefined) {
        let platform = query.platform;

        if (query.platform === "All") {
          platform = ["Instagram", "YouTube"];
        }
        url += `&platform=${platform}`;
      }
      if (query.field !== undefined) {
        let indexedFields = [];
        for (let value of query.field) {
          for (let i = 0; i < categories.length; i++) {
            if (categories[i] === value) {
              indexedFields.push(i);
            }
          }
        }

        url += `&field=${indexedFields}`;
      }
      try {
        const response = await fetch(url);
        if (response.ok) {
          let data = await response.json();

          setData(data.data);
          settypeofDataDisplay("Search result for your query");
        } else {
          throw new Error("error in getting data");
        }
      } catch (error) {}
    } else {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/getInfluencers/featured/platform/instagram`
        );
        if (response.ok) {
          let data = await response.json();
          settypeofDataDisplay("Featured");
          setData(data.data);
        } else {
          throw new Error("erro in getting data");
        }
      } catch (error) {}
    }
  };
  useEffect(() => {
    getData();
  }, [query]);

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

  const handleInfluncerClick = (event, item) => {
    event.preventDefault();
    navigate(`/influencer/${item.uniqueID}`, { state: { account: item } });
  };
  return (
    <>
      <div id="typeOfDataDisplay">{typeOfDataDisplay}</div>
      <div id="display-main">
        <div
          className="grid-container"
          style={{ width: (data.length + 1) * 200 + "px" }}
        >
          {data &&
            data.map((item, index) => (
              <div
                key={index}
                className="grid-item"
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
                  <div
                    style={{
                      width: "100%",
                      height: "320px",
                      overflow: "hidden",
                    }}
                    ref={divRef}
                  >
                    {" "}
                    <img src={item.profilePic} alt="Profile Pic" />
                  </div>

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
                        <a
                          href={`http://instagram.com/${item.iaccountID}`}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            display: "flex", // Add this line
                            alignItems: "center", // Add this line
                            gap: "2px",
                          }}
                        >
                          {iconsArr[0]} {formatFollowers(item.ifollowers)}{" "}
                          Followers
                        </a>
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
                          fontSize: "13px",
                          fontWeight: "500",
                        }}
                      >
                        <a
                          href={`http://youtube.com/${item.iaccountID}`}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            display: "flex", // Add this line
                            alignItems: "center", // Add this line
                            gap: "2px",
                          }}
                        >
                          {iconsArr[1]} {formatFollowers(item.yfollowers)}{" "}
                          Subscriber
                        </a>
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
            ))}
        </div>
      </div>
    </>
  );
};
