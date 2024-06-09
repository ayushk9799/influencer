import React, { useEffect, useState } from "react";
import "./ChatBoxList.css";
import { useSelector } from "react-redux";
import { useNavigateCustom } from "./CustomNavigate";
import { useLocation } from "react-router-dom";
export const ChatBoxList = () => {
  const [chatList, setChatList] = useState([]);
  const { userDetails } = useSelector((state) => state.user);
  const navigate = useNavigateCustom();
  const location = useLocation();

  const index = location.pathname.lastIndexOf("/");
  let currentchat = "";
  if (index !== -1) {
    currentchat = location.pathname.substring(index + 1);
  }
  const handleChatListClick = (uniqueID, id) => {
    navigate(`/chat/${uniqueID}`, { state: { account: id } });
  };
  useEffect(() => {
    const getAllChatsOfUser = async () => {
      const response = await fetch("http://localhost:3000/getAllChats", {
        credentials: "include",
      });
      const { chatsWith } = await response.json();
      console.log(chatsWith);
      setChatList(chatsWith);
    };
    getAllChatsOfUser();
  }, []);
  useEffect(() => {
    const handleResize = () => {};
    handleResize();
    window.addEventListener("resize", handleResize);
    return ()=>{
      window.removeEventListener('resize',handleResize)
    }
  }, []);
  return (
    <div id="chatboxlistcontainer">
      {chatList.map((chat, index) => (
        <div
          key={index}
          className={`${
            chat.participants.some(
              (participant) => participant.uniqueID === currentchat
            )
              ? "current"
              : "chatItem"
          }`}
          onClick={() =>
            `${chat.participants.map((participant) => {
              if (participant._id !== userDetails._id) {
                return handleChatListClick(
                  participant.uniqueID,
                  participant._id
                );
              }
            })}`
          }
        >
          {chat.participants.map((participant) => {
            if (participant._id !== userDetails._id) {
              return (
                <div key={participant._id} className="participantItem">
                  {participant.name}
                </div>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
};
