import React, { useEffect } from 'react'
import './ChatMessage.css'
export const ChatMessage = () => {

  const [messages,setMessage]=useState('');
  useEffect(()=>
  {
    
  })
  return (
    <div style={{border:'1px solid red',flex:'1',position:'relative'}}>
      
      <div id="chathistory">

      </div>
      <div id="chatBox" style={{border:'1px solid yellow',display:'flex',justifyContent:'center',position:'absolute',left:'0',right:'0',bottom:'0'}}>
        <textarea placeholder='Send Requirement and chat' rows={1}></textarea>
      </div>
    </div>
  )
}
