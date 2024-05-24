import {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./DisplayData.css";
import { BACKEND_URL, formatFollowers, getCategory } from "./assets/Data.js";
import { iconsArr } from "./assets/Data.js";
import { useNavigateCustom } from "./CustomNavigate";
import { FaDollarSign } from "react-icons/fa";
export const DisplayData = forwardRef(({ query, button }, ref) => {
  const navigate = useNavigateCustom();
  const divRef = useRef(null);
  const [data, setData] = useState([]);

  const [typeOfDataDisplay, settypeofDataDisplay] = useState();
  useImperativeHandle(ref, () => ({
    getData,
  }));
  const getData = async () => {
    if (button) {
      let categories = getCategory(-1);
      let url = `${BACKEND_URL}/getInfluencers/search/?`;
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
          for (let category of categories) {
            if (category.name === value) {
              indexedFields.push(category.id);
            }
          }
        }
        console.log(indexedFields);
        url += `&field=${indexedFields}`;
      }
      try {
        const response = await fetch(url);
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          setData(data.data);
          settypeofDataDisplay("search result for your query");
        } else {
          throw new Error("error in getting data");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(
          `${BACKEND_URL}/getInfluencers/featured/platform/instagram`
        );
        if (response.ok) {
          let data = await response.json();
          settypeofDataDisplay("Featured");
          setData(data.data);
        } else {
          throw new Error("erro in getting data");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getData();
  }, [button]);

  useEffect(() => {
    const divElement = divRef.current;

    if (divElement) {
      const computedStyle = window.getComputedStyle(divElement);

      // Listen for the image load event
      const img = divElement.querySelector("img");
      img.addEventListener("load", () => {
        const computedStyleAfterLoad = window.getComputedStyle(divElement);
      });
    }

    // Clean up the event listener on component unmount
  }, [divRef.current]);

  const handleInfluncerClick = (item) => {
    navigate(`/influencer/${item.uniqueID}`, { state: { account: item } });
  };
  return (
    <>
      <div id="typeOfDataDisplay">{typeOfDataDisplay}</div>
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
          {data &&
            data.map((item, index) => (
              <div
                key={index}
                className="grid-item"
                onClick={() => handleInfluncerClick(item)}
              >
                <div className="nameRegionImage">
                  <div style={{ width: "100%", height: "320px" }} ref={divRef}>
                    {" "}
                    <img
                      src="https://picsum.photos/200/300"
                      alt="Profile Pic"
                    />
                  </div>

                  <div className="nameRegion">
                    <div className="name">{item.name}</div>
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
                          }}
                        >
                          {iconsArr[0]} {formatFollowers(item.ifollowers)} Followers
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
                          }}
                        >
                          {iconsArr[1]} {formatFollowers(item.yfollowers)} Followers
                        </a>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="fieldContainer" style={{ width: "100%" }}>
                    {item.field.map((fieldIndex, index) => (
                      <div className="fields" key={index}>{getCategory(fieldIndex)}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
});
