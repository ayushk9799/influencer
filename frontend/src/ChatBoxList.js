import React, { useEffect } from "react";
import MockData from "./MOCK_DATA.json";
import "./ChatBoxList.css";
import { Directions } from "@mui/icons-material";
export const ChatBoxList = () => {
  useEffect(() => {
    const handleResize = () => {};
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);
  return <div id="chatboxlistcontainer">ChatBoxList</div>;
};
