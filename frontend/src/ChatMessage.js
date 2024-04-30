import React, { useEffect, useState, useMemo } from "react";
import "./ChatMessage.css";
import { io } from "socket.io-client";
import { useLocation,useSelector } from "react-router-dom";
export const ChatMessage = () => {
  const socket = useMemo(
    () => io("http://localhost:3000", { withCredentials: true }),
    []
  );
  socket.on("connect_error", (err) => {});
  socket.on("connect", () => {});
    // const {userDetails}=useSelector(state=>state.user);
    // const you=userDetails._id;
  const location = useLocation();
  const recieverData= location.state?.account;
  const [messageCurrentSend, setMessageSend] = useState("");
  const [messageLists, setMessageList] = useState([]);
  const [messageCurrentReceived, setMessagaReceived] = useState("");
  const sender = "ayush";

  const arrayObject = [
    {
      sender: "ayush",
      content: "Hello",
      timeStamp: "1",
    },
    {
      sender: "rajiv",
      content: "hi ayush",
      timeStamp: "2",
    },
    {
      sender: "rajiv",
      content: "bhai reshmi ko pata lo tum ",
      timeStamp: "3",
    },
    {
      sender: "ayush",
      content: "nahi bhai ",
      timeStamp: "4",
    },
    {
      sender: "rajiv",
      content: "hi ayush",
      timeStamp: "2",
    },
    {
      sender: "rajiv",
      content: "bhai reshmi ko pata lo tum ",
      timeStamp: "3",
    },
    {
      sender: "ayush",
      content: "nahi bhai ",
      timeStamp: "4",
    },
    {
      sender: "rajiv",
      content: "hi ayush",
      timeStamp: "2",
    },
    {
      sender: "rajiv",
      content: "bhai reshmi ko pata lo tum ",
      timeStamp: "3",
    },
    {
      sender: "ayush",
      content: "nahi bhai ",
      timeStamp: "4",
    },
    {
      sender: "ayush",
      content: "paisa wapas de gaandu ",
      timeStamp: "5",
    },
    {
      sender: "rajiv",
      content: "bhai reshmi ko pata lo tum ",
      timeStamp: "3",
    },
    {
      sender: "ayush",
      content: "nahi bhai ",
      timeStamp: "4",
    },
    {
      sender: "rajiv",
      content: "bhai reshmi ko pata lo tum ",
      timeStamp: "3",
    },
    {
      sender: "ayush",
      content: "nahi bhai ",
      timeStamp: "4",
    },
    {
      sender: "rajiv",
      content: "bhai reshmi ko pata lo tum ",
      timeStamp: "3",
    },
    {
      sender: "ayush",
      content: "nahi bhai ",
      timeStamp: "4",
    },
    {
      sender: "rajiv",
      content: "bhai reshmi ko pata lo tum ",
      timeStamp: "3",
    },
    {
      sender: "ayush",
      content: "nahi bhai ",
      timeStamp: "4",
    },
    {
      sender: "ayush",
      content: "nahi bhai ",
      timeStamp: "4",
    },
    {
      sender: "rajiv",
      content: "bhai reshmi ko pata lo tum ",
      timeStamp: "3",
    },
    {
      sender: "ayush",
      content: "nahi bhai ",
      timeStamp: "4",
    },
    {
      sender: "ayush",
      content: "nahi bhai ",
      timeStamp: "4",
    },
    {
      sender: "ayush",
      content: "nahi bhai ",
      timeStamp: "4",
    },
    {
      sender: "rajiv",
      content: "bhai reshmi ko pata lo tum ",
      timeStamp: "3",
    },
    {
      sender: "ayush",
      content: "nahi bhai ",
      timeStamp: "4",
    },
  ];
  useEffect(() => {
    const getMessages = async () => {
      // const response =await fetch(`http://localhost:3000/chats/t}`,{credentials:'include'})
      // const {messages}= response.json();

      setMessageList(arrayObject);
    };
    getMessages();
  }, []);

  const handleSend = () => {
    socket.emit("message", {
     accountID:recieverData._id,
      content: messageCurrentSend,
    });

    setMessageSend("");
  };

  socket.on("message", (message) => {
    setMessagaReceived(message);
  });
  const handleMesageInput = (event) => {
    setMessageSend(event.target.value);
  };

  return (
    <div
      style={{
        border: "1px solid red",
        flex: "1",
        position: "relative",
        display: "grid",
      }}
    >
      {messageLists.length > 0 ? (
        <div
          id="chathistory"
          style={{
            height: "100%",
            border: "1px solid yellow",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {messageLists.map((message, index) => (
            <div
              key={index}
              style={{
                textAlign: message.sender === "ayush" ? "right" : "left",
                margin: "10px",
                padding: "5px 10px 5px 5px",
                backgroundColor:
                  message.sender === "ayush" ? "#add8e6" : "#90ee90",
                borderRadius: "10px",
                maxWidth: "50%",
                width: "max-content",
                marginLeft: message.sender === "ayush" ? "auto" : "10px",
                marginRight: message.sender === "rajiv" ? "auto" : "10px",
                fontSize: "15px",
                fontFamily:
                  "Segoe UI Historic, Segoe UI, Helvetica, Arial, sans-serif",
                backgroundColor:
                  message.sender === "ayush" ? "black" : "rgb(239, 239, 239)",
                color: message.sender === "ayush" ? "white" : "black",
              }}
            >
              <b>{message.sender}:</b> {message.content}
            </div>
          ))}
        </div>
      ) : (
        <div id="chathistory">No messages yet.</div>
      )}

      <div
        id="chatBox"
        style={{
          border: "1px solid yellow",
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          left: "0",
          right: "0",
          bottom: "0",
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
