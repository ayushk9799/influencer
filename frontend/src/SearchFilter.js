import "./SearchFilter.css";
import { useRef, useState, useEffect } from "react";
import { RangeSelector } from "./RangeSelector";
export const SearchFilter = () => {
  const dropDownRef = useRef(null);
  const fieldref = useRef(null);
  const searchRef = useRef(null);
  const countryRef = useRef(null);
  const followerRef = useRef(null);
  const [searchJsx, setsearchJsx] = useState(null);
  const searchinner = (
    <img
      src="iconSvg.svg"
      style={{ width: 18, height: 18, borderRadius: 4 }}
    ></img>
  );
  const [followerrange, setFollowerRange] = useState(["0", "1M+"]);
  const [socialMediaOptions, setSocialMediaOptions] = useState([
    "Instagram",
    "YouTube",
    "All",
    // Add more social media options here
  ]);
  const [selectedSocialMediaOptions, setselectedSocialMediaOptions] =
    useState(null);
  const [fieldOptions, setFieldOptions] = useState([
    "Dancing",
    "Tech",
    "Gaming",
    "hello",
    "fashion",
    // Add more field options here
  ]);
  const [followerVisibilty, setFollowerVisibilty] = useState(null);
  const [CountryOptions, setCountryOptions] = useState([
    "All",
    "India",
    "USA",
    "UK",
    "Australia",
    "newZealnd",
    // Add more field options here
  ]);
  const [selectedCountryOptions, setSelectedCountryOptions] = useState([]);
  const [selectedfieldOptions, setselectedfieldOptions] = useState([]);
  const handleClickFollowers = () => {
    followerRef.current.style.display =
      followerRef.current.style.display === "none" ? "block" : "none";
  };
  const handleSocialMediaChange = (option, event) => {
    // event.stopPropagation();
    setselectedSocialMediaOptions(option);
  };
  const handleCountryChange = (option, event) => {
    // event.stopPropagation();
    if (!selectedCountryOptions.includes(option))
      setSelectedCountryOptions([...selectedCountryOptions, option]);
  };
  const handleSearch = () => {};
  const handleResize = () => {
    if (window.innerWidth < 700) {
      setsearchJsx(<div>getData</div>);
    } else {
      setsearchJsx(searchinner);
    }
  };
  window.addEventListener("resize", handleResize);

  useEffect(() => {
    handleResize();
  }, []);
  const handleFieldChange = (option, event) => {
    // event.stopPropagation();
    if (!selectedfieldOptions.includes(option))
      setselectedfieldOptions([...selectedfieldOptions, option]);
  };
  const handleClickField = () => {
    fieldref.current.style.display =
      fieldref.current.style.display === "grid" ? "none" : "grid";
  };
  const handleFollowerRangechange = (value) => {
    setFollowerRange(value);
    setFollowerVisibilty(true);
  };
  const handleClickCountry = () => {
    countryRef.current.style.display =
      countryRef.current.style.display === "block" ? "none" : "block";
  };
  const handleClickPlatform = (event) => {
    dropDownRef.current.style.display =
      dropDownRef.current.style.display === "block" ? "none" : "block";
  };
  return (
    <>
      <div id="searchFilterContainer">
        <div id="searchFilter">
          <div className="dropdown" onClick={handleClickPlatform}>
            <div className="dropbtn" id="platform">
              {selectedSocialMediaOptions
                ? selectedSocialMediaOptions
                : "Enter Platform"}
            </div>
            <div
              className="dropdown-content"
              ref={dropDownRef}
              style={{ display: "none" }}
              id="dropdownPlatform"
            >
              {socialMediaOptions.map((option, index) => (
                <div
                  onClick={(event) => handleSocialMediaChange(option, event)}
                  key={index}
                  className="dropPlatfromclass"
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          <div className="dropdown" onClick={handleClickField}>
            <div className="dropbtn">
              {!(selectedfieldOptions.length === 0)
                ? selectedfieldOptions + " "
                : "Field/Category"}
            </div>
            <div
              className="dropdown-content"
              style={{ display: "none" }}
              ref={fieldref}
              id="dropDownField"
            >
              {fieldOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={(event) => handleFieldChange(option, event)}
                  className="fieldClass"
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
          <div className="dropdown" onClick={handleClickCountry}>
            <div className="dropbtn">
              {!(selectedCountryOptions.length === 0)
                ? selectedCountryOptions + " "
                : "Country"}
            </div>
            <div
              className="dropdown-content"
              style={{ display: "none" }}
              id="countryContainer"
              ref={countryRef}
            >
              <div id="outer">
                {CountryOptions.map((option, index) => (
                  <div
                    key={index}
                    onClick={(event) => handleCountryChange(option, event)}
                    className="countryClass"
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="dropdown" onClick={handleClickFollowers}>
            <div className="dropbtn">
              {followerVisibilty
                ? `${followerrange[0]}---->${followerrange[1]}`
                : "Follower Range"}
            </div>
            <div
              className="dropdown-content"
              style={{ display: "none" }}
              ref={followerRef}
              id="range"
              onClick={(event) => event.stopPropagation()}
            >
              <div id="maxandmin">
                <div>
                  MIN
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {followerrange[0]}
                  </div>
                </div>
                <div>
                  MAX
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {followerrange[1]}
                  </div>
                </div>
              </div>
              <RangeSelector sendData={handleFollowerRangechange} />
            </div>
          </div>
          <div id="getData" ref={searchRef} onClick={handleSearch}>
            {searchJsx}
          </div>
        </div>
      </div>
    </>
  );
};
