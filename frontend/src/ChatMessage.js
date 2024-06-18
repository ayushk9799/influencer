import React, { useEffect, useState, useMemo, useRef } from "react";
import "./ChatMessage.css";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdAttachFile, MdClose } from "react-icons/md";
import { s3Domain } from "./assets/Data";
import { IoMdDownload } from "react-icons/io";
import { BACKEND_URL } from "./assets/Data.js";

import axios from "axios";
export const ChatMessage = () => {
  const chatHistoryRef = useRef(null);
  const socket = useRef(null);
  const { userDetails } = useSelector((state) => state.user);
  const you = userDetails._id;

  const location = useLocation();
  const otherID = location.state?.account;

  const [messageCurrentSend, setMessageSend] = useState("");
  const [messageLists, setMessageList] = useState([]);
  const textareaRef = useRef();
  const fileattachRef = useRef();
  const [showFileInput, setShowFileInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];

    setSelectedFile(file);

    try {
      const { data, status } = await axios.get(
        `${BACKEND_URL}/api/user/presigned?total=1`,
        {
          withCredentials: true,
        }
      );
      if (status === 200) {
        const { keys, urls } = data;
        if (keys[0] !== -1 && urls[0] !== -1 && file) {
          const { status } = await fetch(urls[0], {
            body: file,
            method: "PUT",
          });
          if (status === 200) {
            if (socket.current) {
              socket.current.emit("message", {
                accountID: otherID,
                content: keys[0],
                type: file.type,
              });
            }
          }
          setMessageList([
            ...messageLists,
            {
              sender: userDetails._id,
              content: keys[0],
              type: file.type,
              sentAt: new Date().toISOString(),
            },
          ]);
        }
      }
    } catch (error) {}
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
    socket.current = io(`${BACKEND_URL}`, { withCredentials: true });
    initialHeight = Math.floor(
      textareaRef.current.getBoundingClientRect().height
    );

    socket.current.on("message", (data) => {
      setMessageList([
        ...messageLists,
        {
          sender: data.sender,
          content: data.content,
          type: data.type,
          sentAt: data.sentAt,
        },
      ]);
    });

    const getMessages = async () => {
      if (you !== otherID) {
        const response = await fetch(`${BACKEND_URL}/api/chats/${otherID}`, {
          credentials: "include",
        });
        const { chats } = await response.json();

        if (chats) {
          setMessageList([...chats]);
        }
      }
    };
    getMessages();

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [otherID]);

  const findLinks = (text) => {
    const urlPattern = /\b(https?:\/\/\S+)\b/gi;
    const links = [];

    let match;
    while ((match = urlPattern.exec(text)) !== null) {
      links.push(match[1]);
    }

    return links;
  };

  function renderWithLinks(text) {
    const links = findLinks(text);
    const parts = [];

    let startIndex = 0;
    for (const link of links) {
      const linkStartIndex = text.indexOf(link, startIndex);
      if (linkStartIndex !== -1) {
        // Push the text before the link
        parts.push(text.slice(startIndex, linkStartIndex));

        // Push the link wrapped in an <a> tag
        parts.push(
          <a
            key={link}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white" }}
          >
            {link}
          </a>
        );

        startIndex = linkStartIndex + link.length;
      }
    }

    // Push any remaining text after the last link
    parts.push(text.slice(startIndex));

    return parts;
  }
  const renderMessage = (message) => {
    let value;
    if (/^image\/.*/.test(message.type)) {
      value = (
        <img
          src={`${s3Domain}/${message.content}`}
          style={{ width: "200px", height: "200px" }}
        ></img>
      );
    } else if (/^application\/pdf$/i.test(message.type)) {
      value = (
        <div
          style={{
            width: "200px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <IoMdDownload size={20} />
          <a
            href={`${s3Domain}/${message.content}`}
            target="_blank"
            style={{ textDecoration: "none", color: "white" }}
          >
            PDF
          </a>
        </div>
      );
    } else if (/^text\/plain$/.test(message.type)) {
      value = renderWithLinks(message.content);
    }

    return value;
  };
  const handleSend = () => {
    if (socket.current) {
      socket.current.emit("message", {
        accountID: otherID,
        content: messageCurrentSend.trim(),
        sentAt: new Date().toISOString(),
      });

      setMessageList([
        ...messageLists,
        {
          sender: userDetails._id,
          content: messageCurrentSend.trim(),
          sentAt: new Date().toISOString(),
          type: "text/plain",
        },
      ]);

      textareaRef.current.style.height = `${initialHeight}px`;
      textareaRef.current.style.top = "0px";
      setMessageSend("");
    }
  };

  const handleMesageInput = (event) => {
    if (textareaRef.current) {
      if (textareaRef.current.clientHeight <= 200) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

        textareaRef.current.style.top = `${
          30 - textareaRef.current.scrollHeight
        }px`;
      }
      setMessageSend(event.target.value);
    }
  };

  return (
    <div
      style={{
        //  border: "1px solid red",
        flex: "1",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "auto",
        overflowY: "hidden",
      }}
    >
      <div
        ref={chatHistoryRef}
        id="chathistory"
        style={{
          height: "100%",
          //  border:"1px solid yellow",
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
              className="chatmessagedisplay"
            >
              {renderMessage(message)}
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
        <div id="chatBox">
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
            }}
            id="fileattach"
          >
            <MdAttachFile size={22} color="white" />
          </div> */}

          <div
            ref={fileattachRef}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              position: "relative",
            }}
            id="fileattach"
            onClick={() => {
              setShowFileInput(!showFileInput);
            }}
          >
            <MdAttachFile size={22} color="white" />
          </div>

          {showFileInput && (
            <div
              style={{
                position: "absolute",
                top: `${fileattachRef.current.offsetTop - 50}px`,
                left: `${fileattachRef.current.offsetLeft + 150}px`,
                transform: "translateX(-50%)",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: "10px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={handleFileSelect}
                  style={{ marginRight: "5px" }}
                />
                <MdClose
                  size={20}
                  color="gray"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowFileInput(false)}
                />
              </div>
            </div>
          )}
          <textarea
            placeholder="Send Requirement and chat"
            value={messageCurrentSend}
            onChange={handleMesageInput}
            className="textarea"
            ref={textareaRef}
          ></textarea>
          <button
            onClick={handleSend}
            style={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "3px",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
