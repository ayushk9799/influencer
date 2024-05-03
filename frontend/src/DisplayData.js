import { useEffect, useState, useRef } from "react";
import "./DisplayData.css";
import { useNavigate } from "react-router-dom";
import { getCategory } from "./assets/Data.js";
import { iconsArr } from "./assets/Data.js";
export const DisplayData = () => {
  const navigate = useNavigate();
  const divRef = useRef(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "http://localhost:3000/getInfluencers/featured/platform/instagram"
      );
      let data = await response.json();
      setData(data.data);
    };
    getData();
  }, []);

  useEffect(() => {
    const divElement = divRef.current;

    if (divElement) {
      const computedStyle = window.getComputedStyle(divElement);

      // Get the styles before the image has loaded
      const widthBefore = computedStyle.getPropertyValue("width");
      const heightBefore = computedStyle.getPropertyValue("height");

      // Listen for the image load event
      const img = divElement.querySelector("img");
      img.addEventListener("load", () => {
        const computedStyleAfterLoad = window.getComputedStyle(divElement);

        // Get the styles after the image has loaded
        const widthAfter = computedStyleAfterLoad.getPropertyValue("width");
        const heightAfter = computedStyleAfterLoad.getPropertyValue("height");
      });
    }

    // Clean up the event listener on component unmount
  }, [divRef.current]);
  const findLowest = (num1, num2, num3) => {
    const value1 = num1 === undefined ? Infinity : num1;
    const value2 = num2 === undefined ? Infinity : num2;
    const value3 = num3 === undefined ? Infinity : num3;

    const lowestValue = Math.min(value1, value2, value3);
    if (lowestValue === Infinity) {
      return undefined;
    }

    return lowestValue;
  };

  const handleInfluncerClick = (item) => {
    navigate(`/influencer/${item.uniqueID}`, { state: { account: item } });
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
                    <div style={{ fontSize: "10px" }}>{item.region}</div>
                  </div>
                  <div className="pricing">
                    {findLowest(
                      item.iprice?.video,
                      item.iprice?.photo,
                      item.yprice?.video
                    )}
                  </div>
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
                          fontSize: "13px",
                          fontWeight: "500",
                        }}
                      >
                        <a
                          href={`http://instagram.com/${item.iaccountID}`}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {" "}
                          {iconsArr[0]} {item.ifollowers} Followers
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
