import React, { useEffect ,useState} from 'react'
import './ChatMessage.css';
import {io} from 'socket.io-client'
import { useLocation } from 'react-router-dom'
export const ChatMessage = ({details}) => {


const socket =io('http://localhost:3000',{withCredentials: true});
socket.on("connect_error", (err) => {
  console.log(err.message); // prints the message associated with the error
});
  const location =useLocation();
  const accountID=location.state?.account;
  console.log(accountID)
  const [messageCurrent,setMessage]=useState('');
   const sender="ayush";
   

  const arrayObject=[
    {
      sender:"ayush",
      content:"Hello",
      timeStamp:"1"
    },
    {
      sender:"rajiv",
      content:"hi ayush",
      timeStamp:"2"
    },
    {
      sender :"rajiv",
      content:'bhai reshmi ko pata lo tum ',
      timeStamp:'3'
    },
   {
    sender :"ayush",
    content:"nahi bhai ",
    timeStamp:'4'
   } ,
   {
    sender :"ayush",
    content:"paisa wapas de gaandu ",
    timeStamp:"5",
   }
  ]
  const [messageLists,setMessageList]=useState([])
  useEffect(()=>
  {
    const getMessages=async()=>
    {
          // const response =await fetch(`http://localhost:3000/chats/${accountID}`,{credentials:'include'})
          // const {messages}= response.json();
     
          setMessageList(arrayObject);
    }
   getMessages();
  },[]);
  

  const handleSend=()=>
  {
    setMessage('');

  }
  const handleMesageInput=(event)=>
  {
    setMessage(event.target.value);
  }
  console.log(messageCurrent)
  return (
    <div style={{border:'1px solid red',flex:'1',position:'relative'}}>

      {messageLists.length > 0 ? (
      <div id="chathistory" style={{height:'max-content', border:'1px solid yellow',overflow:'auto'}}>
        {messageLists.map((message, index) => (
          <div key={index}  style={{
            textAlign: message.sender === "ayush" ? 'right' : 'left',
            margin: '10px',
            padding: '5px 10px 5px 5px',
            backgroundColor: message.sender === "ayush" ? '#add8e6' : '#90ee90',
            borderRadius: '10px',
            maxWidth:'50%',
            width:'max-content',
            marginLeft: message.sender === "ayush" ? 'auto' : '10px',
            marginRight: message.sender === "rajiv" ? 'auto' : '10px',
            fontSize:'15px',
            fontFamily:'Segoe UI Historic, Segoe UI, Helvetica, Arial, sans-serif',
            backgroundColor:message.sender==='ayush'?'black':'rgb(239, 239, 239)',
            color:message.sender==='ayush'?'white':'black'
          }}>
            <b>{message.sender}:</b> {message.content}
          </div>
        ))}
      </div>
    ) : (
      <div id="chathistory" >
        No messages yet.
      </div>
    )}
    
      <div id="chatBox" style={{border:'1px solid yellow',display:'flex',justifyContent:'center',position:'absolute',left:'0',right:'0',bottom:'0'}}>
        <textarea placeholder='Send Requirement and chat' rows={1} value={messageCurrent} onChange={handleMesageInput}></textarea>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
