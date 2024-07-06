import Featured from "./components/home/Featured.js";
import HomeFAQ from "./components/home/HomeFAQ.js";
import HowDoesWork from "./components/home/HowDoesWork.js";
import { DisplayData } from "./DisplayData.js";
import "./Home.css";
import { SearchFilter } from "./SearchFilter.js";

export const Home = () => {
  return (
    <>
      <div id="homeContainer">
      <div id="home">
          <div className="grid-item nowrap">Your Product</div>
          <div className="grid-item">+</div>
          <div className="grid-item nowrap">Their Audience</div>
          <div className="grid-item">=</div>
          <div className="grid-item">Magic!!</div>
        </div>
        <div id="subheading">
          <p id="leverage">
            Leverage the audience and reach of content creators to boost your
            product.
          </p>
        </div>
      </div>
      <SearchFilter />
      <Featured />
      <Featured name="Instagram" />
      {/* <DisplayData/> */}
      <HowDoesWork />
      <HomeFAQ />
    </>
  );
};
