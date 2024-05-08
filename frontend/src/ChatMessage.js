import React, { useEffect, useState, useMemo, useRef } from "react";
import "./ChatMessage.css";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdAttachFile } from "react-icons/md";
export const ChatMessage = () => {
  const chatHistoryRef = useRef(null);
  const socket = useRef(null);
  const { userDetails } = useSelector((state) => state.user);
  const you = userDetails._id;
  console.log(you);
  const location = useLocation();
  const otherID = location.state?.account;
  console.log(otherID);
  const [messageCurrentSend, setMessageSend] = useState("");
  const [messageLists, setMessageList] = useState([]);
  const textareaRef = useRef();
  const [showFileInput, setShowFileInput] = useState(false);
const [selectedFile, setSelectedFile] = useState(null);
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  setSelectedFile(file);
  // You can perform additional operations with the selected file here
};
  let initialHeight;

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
    initialHeight = Math.floor(
      textareaRef.current.getBoundingClientRect().height
    );
    console.log(initialHeight);
    socket.current.on("message", (message) => {
      console.log(message);
      setMessageList([
        ...messageLists,
        { sender: otherID, content: message, sentAt: new Date().toISOString() },
      ]);
    });
    console.log("renderd");
    const getMessages = async () => {
      if (you !== otherID  && you!==undefined) {
        const response = await fetch(`http://localhost:3000/chats/${otherID}`, {
          credentials: "include",
        });
        const { chats } = await response.json();
        console.log(chats);
        if (chats) {
          setMessageList([...messageLists, ...chats]);
        }
      }
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
        accountID: otherID,
        content: messageCurrentSend.trim(),
      });

      console.log(messageLists);
      setMessageList([
        ...messageLists,
        {
          sender: userDetails._id,
          content: messageCurrentSend.trim(),
          sentAt: new Date().toISOString(),
        },
      ]);

      textareaRef.current.style.height = `${initialHeight}px`;
      textareaRef.current.style.top = "0px";
      setMessageSend("");
    }
  };

  console.log(messageLists.length);
  const handleMesageInput = (event) => {
    console.log(initialHeight);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.style.top = `${
        30 - textareaRef.current.scrollHeight
      }px`;
      console.log(textareaRef.current.style.top);
    }

    setMessageSend(event.target.value);
  };

  return (
    <div
      style={{
        // border: "1px solid red",
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
                marginRight: message.sender === otherID ? "auto" : "10px",
                fontSize: "15px",
                fontFamily:
                  "Segoe UI Historic, Segoe UI, Helvetica, Arial, sans-serif",
                backgroundColor:
                  message.sender === you ? "black" : "rgb(239, 239, 239)",
                color: message.sender === otherID ? "black" : "white",
                whiteSpace: "pre-wrap",
              }}
            >
              {message.content}
            </div>
          ))
        ) : (
          <div>No messages yet</div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          id="chatBox"
          style={{
            //  border: "1px solid black",
            display: "flex",
            justifyContent: "center",
            boxSizing: "border-box",
            height: "30px",
            width: "50%",
            margin: "3px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
            }}
            id="fileattach"
          >
            <MdAttachFile size={22} color="white" />
          </div>
          <textarea
            placeholder="Send Requirement and chat"
            value={messageCurrentSend}
            onChange={handleMesageInput}
            className="textarea"
            ref={textareaRef}
          ></textarea>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};
