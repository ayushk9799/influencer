import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ChatBoxList } from "./ChatBoxList.js";
import { ChatMessage } from "./ChatMessage.js";

export const ChatBox = () => {
  const [height, setHeight] = useState();
  const chatboxref = useRef(null);

  useEffect(() => {
    const updateWindowHeight = () => {
      setHeight(
        window.innerHeight -
          (chatboxref.current.getBoundingClientRect().top+1)
      );
    };
    updateWindowHeight();
    window.addEventListener("resize", updateWindowHeight);

    return () => {
      window.removeEventListener("resize", updateWindowHeight);
    };
  }, []);
 
  return (
    <div
      id="chatBoxContainer"
      style={{
        display: "flex",
         height: `${height}px`,
        boxSizing: "border-box",
        overflowY: "hidden",
        position:"relative",
        bottom:"0px",
     
        left:'0px',
        right:"0px"
      }}
      ref={chatboxref}
    >
      <ChatBoxList />
      <ChatMessage  />
    </div>
  );
};
