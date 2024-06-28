import "./SearchFilter.css";
import { useRef, useState, useEffect } from "react";
import { RangeSelector } from "./RangeSelector";
import { DisplayData } from "./DisplayData";
import { RxCross1 } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import { getCategory } from "./assets/Data";
import { useNavigateCustom } from "./CustomNavigate";
export const SearchFilter = () => {
  const dropDownRef = useRef(null);
  const fieldref = useRef(null);
  const searchRef = useRef(null);

  const countryRef = useRef(null);
  const followerRef = useRef(null);
  const DisplayDataRef = useRef(null);
  const navigate = useNavigateCustom();
  const [searchJsx, setsearchJsx] = useState(null);
  const [searchButton, setsearchButton] = useState(false);
  const query = useRef({});
  const [followerrange, setFollowerRange] = useState(["0", "1M+"]);
  const socialMediaOptions = ["Instagram", "YouTube", "All"];
  const [selectedSocialMediaOptions, setselectedSocialMediaOptions] =
    useState(null);
  const fieldOptions = getCategory(-1);
  const [followerVisibilty, setFollowerVisibilty] = useState(null);
  const CountryOptions = [
    "All",
    "India",
    "USA",
    "UK",
    "Australia",
    "newZealnd",
  ];
  const [selectedCountryOptions, setSelectedCountryOptions] = useState([]);
  const [selectedfieldOptions, setselectedfieldOptions] = useState([]);
  const handleClickFollowers = () => {
    followerRef.current.style.display =
      followerRef.current.style.display === "none" ? "block" : "none";
  };
  const handleSocialMediaChange = (option, event) => {
    // event.stopPropagation();
    query.current.platform = option;
    setselectedSocialMediaOptions(option);
  };
  const handleCountryChange = (option, event) => {
    // event.stopPropagation();
    if (!selectedCountryOptions.includes(option)) {
      query.current.region = option;
      setSelectedCountryOptions(option);
    }
  };
  const handlecross = (index, event) => {
    event.stopPropagation();
    switch (index) {
      case 1:
        delete query.current.platform;
        setselectedSocialMediaOptions(null);
        break;
      case 2:
        delete query.current.field;
        setselectedfieldOptions([]);
        break;
      case 3:
        delete query.current.region;
        setSelectedCountryOptions([]);
        break;
      case 4:
        delete query.current.fmax;
        delete query.current.fmin;

        setFollowerVisibilty(null);
        break;
      default:
        return;
    }
  };
  const handleSearch = () => {
    navigate("/influencer/search", { state: { query: query?.current } });
  };
  const handleResize = () => {
    if (window.innerWidth < 700) {
      setsearchJsx(<div>getData</div>);
    } else {
      setsearchJsx(<FaSearch size={25} />);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleFieldChange = (option, event) => {
    // event.stopPropagation();
    if (!selectedfieldOptions.includes(option)) {
      query.current.field = [...selectedfieldOptions, option];
      setselectedfieldOptions([...selectedfieldOptions, option]);
    }
  };

  const convertToNumber = (value) => {
    let answer = 0;
    switch (value) {
      case 0:
        answer = 0;
        break;
      case "1K":
        answer = 1000;
        break;
      case "10K":
        answer = 10000;
        break;
      case "50K":
        answer = 50000;
        break;
      case "100K":
        answer = 100000;
        break;
      case "500K":
        answer = 500000;
        break;
      case "1M+":
        answer = 1000000;
        break;
      default:
    }
    return answer;
  };
  const handleClickField = () => {
    fieldref.current.style.display =
      fieldref.current.style.display === "grid" ? "none" : "grid";
  };
  const handleFollowerRangechange = (value) => {
    query.current.fmax = convertToNumber(value[1]);
    query.current.fmin = convertToNumber(value[0]);

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
              {selectedSocialMediaOptions ? (
                <div
                  className="cross"
                  onClick={(event) => handlecross(1, event)}
                >
                  <RxCross1 size={20} />
                </div>
              ) : (
                <></>
              )}
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
              <div id="overflows" title={selectedfieldOptions.join(", ")}>
                {" "}
                {!(selectedfieldOptions.length === 0)
                  ? selectedfieldOptions + " "
                  : "Field/Category"}
              </div>

              {!(selectedfieldOptions.length === 0) ? (
                <div
                  className="cross"
                  onClick={(event) => handlecross(2, event)}
                >
                  <RxCross1 size={20} />
                </div>
              ) : (
                <></>
              )}
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
          <div className="dropdown" onClick={handleClickFollowers}>
            <div className="dropbtn">
              {followerVisibilty
                ? `${followerrange[0]}---->${followerrange[1]}`
                : "Follower Range"}
              {followerVisibilty ? (
                <div
                  className="cross"
                  onClick={(event) => handlecross(4, event)}
                >
                  <RxCross1 size={20} />
                </div>
              ) : (
                <></>
              )}
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
