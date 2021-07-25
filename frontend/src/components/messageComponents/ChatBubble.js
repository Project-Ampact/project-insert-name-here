import React from 'react'
import './ChatBubble.css'

function ChatBubble({msg}) {
  return (
    <div className={`chat-bubble ${msg.type}`}>
        <p>{msg.message}</p>
    </div>
  )
}

export default ChatBubble;