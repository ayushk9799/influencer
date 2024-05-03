import React, { useEffect, useState, useMemo, useRef } from "react";
import "./ChatMessage.css";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export const ChatMessage = () => {
  const chatHistoryRef = useRef(null);
  const socket = useRef(null);
  const { userDetails } = useSelector((state) => state.user);
  const you = userDetails._id;
  const location = useLocation();
  const other = (location.state?.account)._id;
  console.log(other);
  const [messageCurrentSend, setMessageSend] = useState("");
  const [messageLists, setMessageList] = useState([]);

  useEffect(() => {
    const chatContainer = chatHistoryRef.current;
    if (chatContainer) {
      chatContainer.scrollTop =
        chatContainer.scrollHeight - chatContainer.clientHeight;
    }
  }, [messageLists]);
  useEffect(() => {
    const chatContainer = chatHistoryRef.current;
    chatContainer.scrollTop =
      chatContainer.scrollHeight - chatContainer.clientHeight;
    socket.current = io("http://localhost:3000", { withCredentials: true });

    socket.current.on("message", (message) => {
      console.log(message);
      setMessageList([
        ...messageLists,
        { sender: other, content: message, sentAt: new Date().toISOString() },
      ]);
    });
console.log("renderd")
    const getMessages = async () => {
      const response = await fetch(`http://localhost:3000/chats/${other}`, {
        credentials: "include",
      });
      const { chats } = await response.json();
      console.log(chats);
      setMessageList([...messageLists, ...chats]);
    };
    getMessages();
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const handleSend = () => {
    if (socket.current) {
      socket.current.emit("message", {
        accountID: other,
        content: messageCurrentSend
      });

      console.log(messageLists);
      setMessageList([
        ...messageLists,
        {
          sender: userDetails._id,
          content: messageCurrentSend,
          sentAt: new Date().toISOString(),
        },
      ]);
      setMessageSend("");
    }
  };

  console.log(messageLists.length);
  const handleMesageInput = (event) => {
    setMessageSend(event.target.value);
  };

  return (
    <div
      style={{
        border: "1px solid red",
        flex: "1",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        ref={chatHistoryRef}
        id="chathistory"
        style={{
          height: "100%",
          border: "1px solid yellow",
          flexGrow: "1",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        {messageLists.length > 0 ? (
          messageLists.map((message, index) => (
            <div
              key={index}
              style={{
                textAlign: message.sender === you ? "right" : "left",
                margin: "10px",
                padding: "5px 10px 5px 5px",
                backgroundColor: message.sender === you ? "#add8e6" : "#90ee90",
                borderRadius: "10px",
                maxWidth: "50%",
                width: "max-content",
                marginLeft: message.sender === you ? "auto" : "10px",
                marginRight: message.sender === other ? "auto" : "10px",
                fontSize: "15px",
                fontFamily:
                  "Segoe UI Historic, Segoe UI, Helvetica, Arial, sans-serif",
                backgroundColor:
                  message.sender === you ? "black" : "rgb(239, 239, 239)",
                color: message.sender === other ? "black" : "white",
              }}
            >
              <b>{message.sender}:</b> {message.content}
            </div>
          ))
        ) : (
          <div>No messages yet</div>
        )}
      </div>

      <div
        id="chatBox"
        style={{
          border: "1px solid yellow",
          display: "flex",
          justifyContent: "center",
          // position: "absolute",
          // left: "0",
          // right: "0",
          // bottom: "0",
          height: "30px",
        }}
      >
        <textarea
          placeholder="Send Requirement and chat"
          value={messageCurrentSend}
          onChange={handleMesageInput}
        ></textarea>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};
