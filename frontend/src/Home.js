import { DisplayData } from "./DisplayData.js";
import "./Home.css";
import { SearchFilter } from "./SearchFilter.js";

export const Home = () => {
  return (
    <>
      <div id="homeContainer">
        <div id="home">Your Product + Their Audience = Magic!!</div>

        <div id="subheading">
          <p id="leverage">
            Leverage the audience and reach of content creators to boost your
            product.
          </p>
        </div>
      </div>
      <SearchFilter />
      <DisplayData/>
    </>
  );
};
