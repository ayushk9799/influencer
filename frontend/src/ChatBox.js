import React,{useState,useEffect,useRef} from 'react'
import { useParams } from 'react-router-dom';
import {ChatBoxList} from './ChatBoxList.js';
import {ChatMessage} from './ChatMessage.js'

export const ChatBox = ({details}) => {
  const [height, setHeight] = useState();;
  const chatboxref=useRef(null);

  useEffect(() => {

console.log(chatboxref.current.getBoundingClientRect().top)
    const updateWindowHeight = () => {

      setHeight(window.innerHeight-(chatboxref.current.getBoundingClientRect().top+1));
    };
    updateWindowHeight();
    window.addEventListener('resize', updateWindowHeight);

    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', updateWindowHeight);
    };
  }, []);
const {userID}=useParams();
  return (
    <div  id="chatBoxContainer" style={{display:"flex",height:`${height}px`,boxSizing:"border-box",overflowY:'hidden'}} ref={chatboxref}>
        <ChatBoxList/>
        <ChatMessage details={details}/>
    </div>
  )
}
